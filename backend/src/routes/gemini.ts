import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { GeminiService, GeminiChatRequest, GeminiDiagramRequest } from '../services/geminiService';

const router = express.Router();
const geminiService = new GeminiService();

// Rate limiting: 20 requests per 15 minutes
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
});

const diagramLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Quá nhiều yêu cầu tạo sơ đồ. Vui lòng thử lại sau 15 phút.'
});

// POST /api/gemini/chat
router.post('/chat', chatLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: GeminiChatRequest = req.body;

    if (!request.message && !request.fileData) {
      return res.status(400).json({
        status: 'error',
        message: 'Message hoặc fileData là bắt buộc'
      });
    }

    const responseText = await geminiService.sendChatMessage(request);

    res.json({
      status: 'success',
      text: responseText
    });
  } catch (error: any) {
    next(error);
  }
});

// POST /api/gemini/diagram
router.post('/diagram', diagramLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: GeminiDiagramRequest = req.body;

    if (!request.description) {
      return res.status(400).json({
        status: 'error',
        message: 'Description là bắt buộc'
      });
    }

    const mermaidCode = await geminiService.generateDiagram(request);

    res.json({
      status: 'success',
      mermaidCode
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
