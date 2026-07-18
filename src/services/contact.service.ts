import { sanitizeText } from '../utils/sanitize';
import { sendContactEmail } from '../utils/sendEmail';
import type { ContactEmailPayload } from '../utils/sendEmail';

export const sendContactMessageService = async (payload: ContactEmailPayload) => {
  const sanitizedPayload = {
    name: sanitizeText(payload.name),
    email: sanitizeText(payload.email),
    subject: sanitizeText(payload.subject),
    message: sanitizeText(payload.message),
  };

  await sendContactEmail(sanitizedPayload);

  return {
    success: true,
    message: 'Message sent successfully.',
  };
};
