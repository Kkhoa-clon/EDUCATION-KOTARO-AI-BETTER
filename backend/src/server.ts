/**
 * EXPRESS SERVER SETUP
 * 
 * Mục đích: Khởi tạo Express server và cấu hình middleware
 * 
 * Chức năng:
 * 1. Setup Express app
 * 2. Cấu hình CORS
 * 3. Cấu hình body parser
 * 4. Đăng ký routes
 * 5. Error handling
 * 6. Start server
 * 
 * Environment Variables:
 * - PORT: Port để chạy server (default: 5000)
 * - FRONTEND_URL: URL của frontend để CORS
 * - NODE_ENV: development/production
 * 
 * TODO: Implement server
 * 1. Import và setup Express
 * 2. Setup CORS middleware
 * 3. Setup body parser (JSON, URL encoded)
 * 4. Import và đăng ký routes
 * 5. Setup error handling middleware
 * 6. Start server với PORT từ env
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { errorHandler } from './middleware/errorHandler';
// import { logger } from './middleware/logger';
// import geminiRoutes from './routes/gemini';
// import nasaRoutes from './routes/nasa';
// import emailRoutes from './routes/email';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// TODO: Setup CORS
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true
// }));

// TODO: Setup body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// TODO: Setup logger middleware
// app.use(logger);

// TODO: Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'Backend server is running. Routes are not implemented yet.'
  });
});

// TODO: Register API routes
// app.use('/api/gemini', geminiRoutes);
// app.use('/api/nasa', nasaRoutes);
// app.use('/api/email', emailRoutes);

// TODO: Setup error handling middleware (phải ở cuối cùng)
// app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Backend Server - EDUCATION KOTARO AI                ║
║   Đang chạy tại: http://localhost:${PORT}              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║   Status: Routes chưa được implement                  ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
