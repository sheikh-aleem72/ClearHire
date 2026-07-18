import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many contact requests. Please try again later.',
  },
});
