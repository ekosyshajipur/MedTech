import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { saveToGoogleSheet } from '@/lib/googleSheet';
import { rateLimit } from '@/lib/rateLimiter';
import { saveSubmission } from '@/lib/db';
import { siteConfig } from '@/lib/config';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(ip, 25, 60000);
    
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { email } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const cleanEmail = String(email).trim().toLowerCase();

    const savedRecord = saveSubmission('newsletter', { email: cleanEmail, timestamp });

    const welcomeHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #059669; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 22px;">Welcome to ${siteConfig.name}</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #d1fae5;">Medical Equipment & Healthcare Innovation Newsletter</p>
        </div>
        <div style="padding: 24px; color: #374151;">
          <p>Thank you for subscribing to our industry newsletter. You will receive updates on certified medical equipment releases, global procurement tenders, and healthcare manufacturing advancements.</p>
          <p>Subscription Ref: <strong>${savedRecord.referenceId}</strong></p>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #6b7280;">
            ${siteConfig.name} | ${siteConfig.address}
          </div>
        </div>
      </div>
    `;

    await Promise.allSettled([
      sendEmail(cleanEmail, `Welcome to ${siteConfig.name} Industry Updates`, welcomeHtml),
      saveToGoogleSheet({ email: cleanEmail, referenceId: savedRecord.referenceId, subscription_date: timestamp, source: 'Newsletter' })
    ]);

    return NextResponse.json({
      success: true,
      referenceId: savedRecord.referenceId,
      message: 'Subscribed to EKOSYS Medical Updates successfully.'
    });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
