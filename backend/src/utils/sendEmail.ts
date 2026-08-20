import { Resend } from 'resend';
import { env } from '../config/serverConfig';

const resend = new Resend(env.RESEND_API_KEY);

const FROM_EMAIL = env.RESEND_FROM_EMAIL;

export const sendOtpEmail = async (
  to: string,
  otp: string,
  purpose: 'signup' | 'reset'
) => {
  const subject =
    purpose === 'signup'
      ? 'Your ClearHire signup verification OTP'
      : 'Your ClearHire password reset OTP';

  const text = `Your verification code is: ${otp}. It expires in ${env.OTP_EXPIRES_MINUTES} minutes.`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>ClearHire Verification</h2>

      <p>Your verification code is:</p>

      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">
        ${otp}
      </p>

      <p>
        If you did not request this code, you can safely ignore this email.
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    text,
    html,
  });

  if (error) {
    console.error('Failed to send OTP email:', error);
    throw new Error('Failed to send verification email');
  }

  console.log(`OTP email sent successfully. Email ID: ${data?.id}`);
};

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}: ContactEmailPayload) => {
  const text = `
New Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

-----------------------------------------

${message}
`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Contact Message</h2>

      <table cellpadding="6">
        <tr>
          <td><strong>Name</strong></td>
          <td>${name}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${email}</td>
        </tr>

        <tr>
          <td><strong>Subject</strong></td>
          <td>${subject}</td>
        </tr>
      </table>

      <hr />

      <p style="white-space: pre-line;">
        ${message}
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [env.CONTACT_RECEIVER_EMAIL],
    replyTo: email,
    subject: `[ClearHire Contact] ${subject}`,
    text,
    html,
  });

  if (error) {
    console.error('Failed to send contact email:', error);
    throw new Error('Failed to send contact email');
  }

  console.log(`Contact email sent successfully. Email ID: ${data?.id}`);
};