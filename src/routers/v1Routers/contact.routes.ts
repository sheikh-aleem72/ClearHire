import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { contactSchema } from '../../validators/contact.validator';
import { sendContactMessage } from '../../controllers/contact.controller';
import { contactRateLimiter } from '../../middleware/contactRateLimiter';

const router = Router();

router.post('/', contactRateLimiter, validateRequest(contactSchema), sendContactMessage);

export default router;
