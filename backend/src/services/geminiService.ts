/**
 * GEMINI AI SERVICE
 * 
 * Mục đích: Xử lý tích hợp với Google Gemini AI API
 * 
 * Chức năng cần implement:
 * 1. Chat với Gemini AI - nhận message từ user và trả về response
 * 2. Tạo sơ đồ/diagram từ mô tả text
 * 3. Xử lý file upload (hình ảnh, PDF) để phân tích
 * 4. Quản lý chat history để có context trong cuộc hội thoại
 * 
 * API Endpoints cần tạo:
 * - POST /api/gemini/chat - Chat với AI
 * - POST /api/gemini/diagram - Tạo sơ đồ
 * - POST /api/gemini/analyze-image - Phân tích hình ảnh
 * 
 * Environment Variables cần:
 * - GEMINI_API_KEY: API key từ Google AI Studio
 * 
 * Tài liệu tham khảo:
 * - https://ai.google.dev/docs
 * - https://ai.google.dev/api/rest
 */

// TODO: Implement Gemini AI Service
// 1. Setup Gemini API client
// 2. Implement chat function
// 3. Implement diagram generation
// 4. Add error handling
// 5. Add rate limiting

export class GeminiService {
  // TODO: Implement constructor với API key
  constructor() {
    // Initialize Gemini API client
  }

  // TODO: Implement chat method
  async sendChatMessage(message: string, chatHistory?: any[]): Promise<string> {
    // Send message to Gemini API
    // Return response text
    throw new Error('Not implemented yet');
  }

  // TODO: Implement diagram generation
  async generateDiagram(description: string): Promise<string> {
    // Generate diagram from description
    // Return diagram data (SVG, Mermaid, etc.)
    throw new Error('Not implemented yet');
  }
}
