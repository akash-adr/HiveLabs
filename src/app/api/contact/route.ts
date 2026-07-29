import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, company, service, details } = data;

    // Use EMAIL_USER from env, or a fallback if they haven't set it yet
    const userEmail = process.env.EMAIL_USER || "your-email@gmail.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: userEmail, // Send the lead to yourself
      replyTo: email, // If you hit reply, it goes to the customer
      subject: `New Lead: ${name} - ${service}`,
      text: `You have a new contact form submission!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nService Interested In: ${service}\n\nProject Details:\n${details}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
            .header { background: #0a0a0a; padding: 32px 40px; text-align: left; }
            .header h1 { color: #fdb906; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { color: rgba(255,255,255,0.7); margin: 8px 0 0 0; font-size: 14px; }
            .content { padding: 40px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
            .field { margin-bottom: 24px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; font-weight: 700; margin-bottom: 6px; }
            .value { font-size: 16px; color: #0a0a0a; font-weight: 500; margin: 0; }
            .message-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px; }
            .message-text { font-size: 15px; line-height: 1.6; color: #3f3f46; margin: 0; white-space: pre-wrap; }
            .footer { padding: 24px 40px; background: #fafafa; text-align: center; border-top: 1px solid #e4e4e7; }
            .footer p { color: #a1a1aa; font-size: 13px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>HiveLabs.</h1>
              <p>New Lead Notification</p>
            </div>
            
            <div class="content">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td width="50%" valign="top" style="padding-bottom: 24px;">
                    <div class="label">Name</div>
                    <div class="value">${name}</div>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom: 24px;">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${email}" style="color: #0a0a0a; text-decoration: underline;">${email}</a></div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" valign="top">
                    <div class="label">Phone Number</div>
                    <div class="value">${phone || "Not provided"}</div>
                  </td>
                  <td width="50%" valign="top">
                    <div class="label">Company</div>
                    <div class="value">${company || "Not provided"}</div>
                  </td>
                </tr>
              </table>

              <div class="field">
                <div class="label">Service Interested In</div>
                <div class="value" style="display: inline-block; background: #fffbeb; color: #d97706; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; border: 1px solid #fde68a;">
                  ${service}
                </div>
              </div>

              <div class="field">
                <div class="label" style="margin-bottom: 12px;">Project Details</div>
                <div class="message-box">
                  <p class="message-text">${details || "No additional details provided."}</p>
                </div>
              </div>
            </div>

            <div class="footer">
              <p>You can reply directly to this email to reach the client.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
