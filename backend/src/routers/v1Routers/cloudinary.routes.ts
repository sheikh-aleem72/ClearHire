import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { getPresignedUrls } from '../../controllers/cloudinary.controller';

const router = express.Router();

// Route to get presigned url to upload resume to cloudinary
router.post('/presigned-urls', authMiddleware, getPresignedUrls);

export default router;
