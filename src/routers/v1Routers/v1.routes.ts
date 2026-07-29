import express from 'express';
import userRouter from './user.routes';
import cloudinaryRouter from './cloudinary.routes';
import resumeRouter from './resume.routes';
import jobRouter from './job.routes';
import batchRouter from './batch.routes';
import resumeProcessingsRouter from './resumeProcessings.routes';
import contactRoutes from './contact.routes';

const router = express.Router();

// Authentication and user routes
router.use('/user', userRouter);

// Cloudinary route
router.use('/cloudinary', cloudinaryRouter);

// Resume route
router.use('/resume', resumeRouter);

// Job route
router.use('/job', jobRouter);

// Handler routes related to batch
router.use('/batch', batchRouter);

// Handle routes related to resumeProcessings
router.use('/processing', resumeProcessingsRouter);

// Handle routes related to contact
router.use('/contact', contactRoutes);

export default router;
