import { NextResponse } from 'next/server';
import { sendAdminNotification, sendConfirmationEmail } from '@/lib/email';
import { saveToGoogleSheet } from '@/lib/googleSheet';
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
    const { name, email, rating, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and feedback message are required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const dataObj = {
      name: String(name).trim(),
      email: String(email).trim(),
      rating: Number(rating || 5),
      category: String(category || 'General Experience').trim(),
      message: String(message).trim(),
      timestamp
    };

    const savedRecord = saveSubmission('feedback', dataObj);
    const referenceId = savedRecord.referenceId;

    await Promise.allSettled([
      sendConfirmationEmail(dataObj.email, dataObj.name, referenceId),
      sendAdminNotification(`Customer Quality Feedback [Rating: ${dataObj.rating}/5]`, { ...dataObj, referenceId }, referenceId),
      saveToGoogleSheet({ ...dataObj, rating: String(dataObj.rating), referenceId, source: 'Customer Feedback' })
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Thank you for your valuable feedback. Your input helps us advance healthcare standards.'
    });
  } catch (error) {
    console.error('Feedback API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing feedback' }, { status: 500 });
  }
}
