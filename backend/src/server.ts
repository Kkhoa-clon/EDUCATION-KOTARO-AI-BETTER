import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import geminiRoutes from './routes/gemini';
import nasaRoutes from './routes/nasa';
import emailRoutes from './routes/email';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/gemini', geminiRoutes);
app.use('/api/nasa', nasaRoutes);
app.use('/api/email', emailRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Backend Server - EDUCATION KOTARO AI                ║
║   Đang chạy tại: http://localhost:${PORT}              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
