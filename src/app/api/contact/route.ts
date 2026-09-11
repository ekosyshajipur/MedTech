import { NextResponse } from 'next/server';
import { sendAdminNotification, sendConfirmationEmail } from '@/lib/email';
import { saveToGoogleSheet } from '@/lib/googleSheet';
import { saveToCRM } from '@/lib/crm';
import { rateLimit } from '@/lib/rateLimiter';
import { saveSubmission } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(ip, 15, 60000);
    
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, company, subject, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Optional Turnstile verification if secret and token exist
    if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
      try {
        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
        });
        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
          console.warn('Turnstile verification failed for token');
        }
      } catch (err) {
        console.warn('Turnstile check network issue, proceeding with caution:', err);
      }
    }

    const timestamp = new Date().toISOString();
    const dataObj = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || '').trim(),
      company: String(company || '').trim(),
      subject: String(subject || 'General Contact').trim(),
      message: String(message).trim(),
      timestamp
    };

    // 1. Persist to local database
    const savedRecord = saveSubmission('contact', dataObj);
    const referenceId = savedRecord.referenceId;

    // 2. Parallel external dispatches (Resilient - won't fail if external service has issue)
    await Promise.allSettled([
      sendConfirmationEmail(dataObj.email, dataObj.name, referenceId),
      sendAdminNotification(`New Contact Enquiry [${dataObj.subject}]`, { ...dataObj, referenceId }, referenceId),
      saveToGoogleSheet({ ...dataObj, referenceId, source: 'Contact Form' }),
      saveToCRM({ ...dataObj, referenceId, lead_source: 'Website Contact' })
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Your message has been received by EKOSYS Corporation.'
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing submission' }, { status: 500 });
  }
}
