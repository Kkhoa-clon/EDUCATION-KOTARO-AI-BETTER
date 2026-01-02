import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { EmailService, EmailRequest } from '../services/emailService';

const router = express.Router();
const emailService = new EmailService();

// Rate limiting: 5 requests per 15 minutes (email thường ít gửi hơn)
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Quá nhiều yêu cầu gửi email. Vui lòng thử lại sau 15 phút.'
});

// POST /api/email/send
router.post('/send', emailLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: EmailRequest = req.body;

    await emailService.sendEmail(request);

    res.json({
      status: 'success',
      message: 'Email đã được gửi thành công'
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
