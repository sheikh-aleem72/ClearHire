import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must contain at least 2 characters.').max(100),

  email: z.string().trim().email('Invalid email address.'),

  subject: z.string().trim().min(5).max(120),

  message: z.string().trim().min(20).max(3000),

  // Honeypot field
  website: z.string().optional().default(''),
});

export type ContactPayload = z.infer<typeof contactSchema>;
