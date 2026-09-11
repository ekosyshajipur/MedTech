import nodemailer from 'nodemailer';
import { siteConfig } from './config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not provided; skipping live email dispatch.');
    return { skipped: true };
  }
  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || siteConfig.name}" <${process.env.FROM_EMAIL || siteConfig.email}>`,
    to,
    subject,
    html,
  });
  return info;
};

export const sendAdminNotification = async (subject: string, data: Record<string, unknown>, referenceId?: string) => {
  let html = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 650px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">`;
  html += `<div style="background-color: #059669; padding: 18px; color: white;">`;
  html += `<h2 style="margin: 0; font-size: 20px;">${subject}</h2>`;
  if (referenceId) {
    html += `<p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Reference ID: <strong>${referenceId}</strong></p>`;
  }
  html += `</div><div style="padding: 24px; background-color: #ffffff;">`;
  html += `<table style="width: 100%; border-collapse: collapse;">`;
  for (const [key, value] of Object.entries(data)) {
    const displayVal = typeof value === 'object' ? JSON.stringify(value) : String(value ?? 'N/A');
    html += `<tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%; color: #4b5563; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>`;
    html += `<td style="padding: 10px; border-bottom: 1px solid #eee; color: #111827;">${displayVal || 'N/A'}</td></tr>`;
  }
  html += `</table></div></div>`;

  return sendEmail(siteConfig.adminEmail, `[EKOSYS] ${subject}`, html);
};

export const sendConfirmationEmail = async (to: string, name: string, referenceId?: string) => {
  const subject = `Enquiry Received (${referenceId || 'EKOSYS'}) — EKOSYS Corporation`;
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #059669; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">EKOSYS Corporation</h1>
        <p style="color: #d1fae5; margin-top: 4px; font-size: 13px;">${siteConfig.tagline}</p>
      </div>
      <div style="padding: 30px; background-color: #ffffff; color: #374151;">
        <h2 style="color: #111827; margin-top: 0; font-size: 18px;">Hello ${name},</h2>
        <p style="line-height: 1.6;">Thank you for contacting EKOSYS Corporation. We have received your submission and our medical procurement specialists are reviewing your request.</p>
        
        ${referenceId ? `
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 13px; color: #166534;">Your Official Tracking Reference:</p>
          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #059669; font-family: monospace;">${referenceId}</p>
        </div>` : ''}

        <p style="line-height: 1.6;">A dedicated institutional sales representative will follow up with technical documentation, product catalogs, and quotation details.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-weight: bold; color: #111827;">Best regards,</p>
          <p style="margin: 4px 0 0 0; color: #059669; font-weight: 600;">EKOSYS MedTech Institutional Procurement Team</p>
        </div>
      </div>
      <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">${siteConfig.address}</p>
        <p style="margin: 6px 0 0 0;">📞 ${siteConfig.phone} | ✉️ ${siteConfig.email}</p>
      </div>
    </div>
  `;
  return sendEmail(to, subject, html);
};
