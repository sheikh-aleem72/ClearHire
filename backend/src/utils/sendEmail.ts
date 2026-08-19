import nodemailer from 'nodemailer';
import { env } from '../config/serverConfig'; // your env access

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

/** send otp mail - simple html/text template */
export const sendOtpEmail = async (to: string, otp: string, purpose: 'signup' | 'reset') => {
  const subject = purpose === 'signup' ? 'Your signup verification OTP' : 'Your password reset OTP';

  const text = `Your verification code is: ${otp}. It expires in ${env.OTP_EXPIRES_MINUTES} minutes.`;

  const html = `<p>Your verification code is: <b>${otp}</b></p>
                <p>This code will expire in ${env.OTP_EXPIRES_MINUTES} minute(s).</p>`;

  await transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
};

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async ({ name, email, subject, message }: ContactEmailPayload) => {
  const text = `
New Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

-----------------------------------------

${message}
`;

  const html = `
    <h2>New Contact Message</h2>

    <table cellpadding="6">
      <tr>
        <td><b>Name</b></td>
        <td>${name}</td>
      </tr>

      <tr>
        <td><b>Email</b></td>
        <td>${email}</td>
      </tr>

      <tr>
        <td><b>Subject</b></td>
        <td>${subject}</td>
      </tr>
    </table>

    <hr/>

    <p style="white-space:pre-line">
      ${message}
    </p>
  `;

  await transporter.sendMail({
    from: env.SMTP_USER,
    to: env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `[ClearHire Contact] ${subject}`,
    text,
    html,
  });
};
