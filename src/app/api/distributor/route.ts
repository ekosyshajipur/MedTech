import { NextResponse } from 'next/server';
import { sendAdminNotification, sendConfirmationEmail } from '@/lib/email';
import { saveToGoogleSheet } from '@/lib/googleSheet';
import { saveToCRM } from '@/lib/crm';
import { rateLimit } from '@/lib/rateLimiter';
import { saveSubmission } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(ip, 10, 60000);
    
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { 
      companyName, contactPerson, email, phone, country, city, 
      currentBusiness, yearsInBusiness, annualRevenue, productInterests, message 
    } = body;

    if (!companyName || !contactPerson || !email || !phone || !country) {
      return NextResponse.json({ error: 'Company name, contact person, email, phone, and country are required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const dataObj = {
      companyName: String(companyName).trim(),
      contactPerson: String(contactPerson).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      country: String(country).trim(),
      city: String(city || '').trim(),
      currentBusiness: String(currentBusiness || '').trim(),
      yearsInBusiness: String(yearsInBusiness || '').trim(),
      annualRevenue: String(annualRevenue || '').trim(),
      productInterests: Array.isArray(productInterests) ? productInterests.join(', ') : String(productInterests || ''),
      message: String(message || '').trim(),
      timestamp
    };

    // Save to local database
    const savedRecord = saveSubmission('distributor', dataObj);
    const referenceId = savedRecord.referenceId;

    await Promise.allSettled([
      sendConfirmationEmail(dataObj.email, dataObj.contactPerson, referenceId),
      sendAdminNotification(`New Global Distributor Application: ${dataObj.companyName} (${dataObj.country})`, { ...dataObj, referenceId }, referenceId),
      saveToGoogleSheet({ ...dataObj, referenceId, source: 'Distributor Application' }),
      saveToCRM({ ...dataObj, referenceId, lead_source: 'Distributor Application' })
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Your distributor application has been registered successfully.'
    });
  } catch (error) {
    console.error('Distributor API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing application' }, { status: 500 });
  }
}
