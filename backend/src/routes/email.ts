/**
 * EMAIL ROUTES
 * 
 * Mục đích: Định nghĩa các API endpoints cho email service
 * 
 * Routes:
 * - POST /api/email/send - Gửi email đơn giản
 * - POST /api/email/contact - Gửi email từ contact form
 * - POST /api/email/notification - Gửi thông báo
 * 
 * Middleware cần:
 * - Rate limiting: Giới hạn số email gửi (tránh spam)
 * - Validation: Validate email addresses và content
 * - Sanitization: Sanitize input để tránh injection
 * 
 * TODO: Implement routes
 * 1. Import EmailService
 * 2. Setup rate limiting (strict hơn vì email)
 * 3. Create POST /send route
 * 4. Create POST /contact route
 * 5. Create POST /notification route
 * 6. Add validation middleware
 * 7. Add error handling
 */

import express, { Request, Response, NextFunction } from 'express';
// import { EmailService } from '../services/emailService';
// import rateLimit from 'express-rate-limit';

const router = express.Router();
// const emailService = new EmailService();

// TODO: Setup strict rate limiting for email
// const emailLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 emails per 15 minutes (strict hơn)
//   message: 'Quá nhiều yêu cầu gửi email. Vui lòng thử lại sau 15 phút.'
// });

// TODO: POST /api/email/send
// router.post('/send', emailLimiter, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { to, subject, text, html } = req.body;
//     // Validate email addresses
//     // Call emailService.sendEmail()
//     // Return success response
//   } catch (error) {
//     next(error);
//   }
// });

// TODO: POST /api/email/contact
// router.post('/contact', emailLimiter, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, email, message } = req.body;
//     // Validate all fields
//     // Sanitize input
//     // Call emailService.sendContactEmail()
//     // Return success response
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
