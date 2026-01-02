/**
 * GEMINI AI ROUTES
 * 
 * Mục đích: Định nghĩa các API endpoints cho Gemini AI
 * 
 * Routes:
 * - POST /api/gemini/chat - Chat với Gemini AI
 * - POST /api/gemini/diagram - Tạo sơ đồ từ mô tả
 * - POST /api/gemini/analyze-image - Phân tích hình ảnh
 * 
 * Middleware cần:
 * - Rate limiting: Giới hạn số request để tránh abuse
 * - Authentication: Xác thực user (nếu cần)
 * - Validation: Validate request body
 * 
 * TODO: Implement routes
 * 1. Import GeminiService
 * 2. Setup rate limiting middleware
 * 3. Create POST /chat route
 * 4. Create POST /diagram route
 * 5. Add error handling
 */

import express, { Request, Response, NextFunction } from 'express';
// import { GeminiService } from '../services/geminiService';
// import rateLimit from 'express-rate-limit';

const router = express.Router();
// const geminiService = new GeminiService();

// TODO: Setup rate limiting
// const chatLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 20, // 20 requests per 15 minutes
//   message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
// });

// TODO: POST /api/gemini/chat
// router.post('/chat', chatLimiter, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { message, chatHistory } = req.body;
//     // Validate request
//     // Call geminiService.sendChatMessage()
//     // Return response
//   } catch (error) {
//     next(error);
//   }
// });

// TODO: POST /api/gemini/diagram
// router.post('/diagram', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { description } = req.body;
//     // Validate request
//     // Call geminiService.generateDiagram()
//     // Return diagram data
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
