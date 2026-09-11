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
    const { name, email, phone, company, category, product, quantity, deliveryRequirements, message } = body;

    if (!name || !email || !product) {
      return NextResponse.json({ error: 'Name, email, and product name are required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const dataObj = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || '').trim(),
      company: String(company || '').trim(),
      category: String(category || '').trim(),
      product: String(product).trim(),
      quantity: String(quantity || '1').trim(),
      deliveryRequirements: String(deliveryRequirements || 'Standard Delivery').trim(),
      message: String(message || '').trim(),
      timestamp
    };

    // Save to local database
    const savedRecord = saveSubmission('enquiry', dataObj);
    const referenceId = savedRecord.referenceId;

    // Parallel external sync
    await Promise.allSettled([
      sendConfirmationEmail(dataObj.email, dataObj.name, referenceId),
      sendAdminNotification(`New Product Quotation Request: ${dataObj.product}`, { ...dataObj, referenceId }, referenceId),
      saveToGoogleSheet({ ...dataObj, referenceId, source: 'Product Enquiry' }),
      saveToCRM({ ...dataObj, referenceId, lead_source: 'Website Product Enquiry' })
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Your product quotation request has been submitted successfully.'
    });
  } catch (error) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing enquiry' }, { status: 500 });
  }
}
