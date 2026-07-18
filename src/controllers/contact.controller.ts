import { Request, Response, NextFunction } from 'express';
import { sendContactMessageService } from '../services/contact.service';
import { AppError } from '../utils/AppErrors';

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const response = await sendContactMessageService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    // ❌ Handle unexpected errors
    console.error('Error in contact controller:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong on our side',
    });
  }
};
