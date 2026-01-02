import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

if (!GEMINI_API_KEY) {
  console.warn('⚠️ GEMINI_API_KEY chưa được cấu hình trong .env');
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text?: string; inline_data?: { data: string; mime_type: string } }>;
}

export interface GeminiChatRequest {
  message?: string;
  chatHistory?: ChatMessage[];
  systemPrompt?: string;
  fileData?: { data: string; mime_type: string };
}

export interface GeminiDiagramRequest {
  description: string;
}

// System prompt tiếng Việt từ dự án cũ
const VIETNAMESE_SYSTEM_PROMPT = `Bạn là Kotaro AI - một trợ lý AI thông minh và thân thiện. Hãy luôn trả lời bằng tiếng Việt một cách tự nhiên, dễ hiểu và hữu ích. 

QUY TẮC QUAN TRỌNG:
1. LUÔN LUÔN trả lời bằng tiếng Việt, không bao giờ dùng tiếng Anh
2. Ngay cả khi người dùng hỏi bằng tiếng Anh, bạn vẫn phải trả lời bằng tiếng Việt
3. Sử dụng ngôn ngữ thân thiện, gần gũi như đang nói chuyện với bạn
4. Trả lời chi tiết và hữu ích, nhưng không quá dài dòng
5. Nếu được hỏi về code, hãy giải thích bằng tiếng Việt trước, sau đó mới đưa code
6. Khi gặp câu hỏi khó, hãy chia nhỏ vấn đề và giải thích từng bước
7. Luôn tỏ ra nhiệt tình và sẵn sàng giúp đỡ
8. Sử dụng emoji phù hợp để tạo cảm giác thân thiện

TÍNH CÁCH: Thân thiện, kiên nhẫn, hài hước nhẹ nhàng, và luôn muốn giúp đỡ người dùng.

LƯU Ý: Đây là yêu cầu bắt buộc - KHÔNG BAO GIỜ trả lời bằng tiếng Anh, chỉ dùng tiếng Việt.`;

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = GEMINI_API_KEY || '';
    this.apiUrl = `${GEMINI_API_URL}?key=${this.apiKey}`;
  }

  async sendChatMessage(request: GeminiChatRequest): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY chưa được cấu hình');
    }

    const contents: ChatMessage[] = [];

    // Thêm system prompt tiếng Việt (từ dự án cũ)
    const systemPrompt = request.systemPrompt || VIETNAMESE_SYSTEM_PROMPT;
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });

    // Thêm lịch sử chat
    if (request.chatHistory) {
      contents.push(...request.chatHistory);
    }

    // Thêm tin nhắn mới
    const parts: Array<{ text?: string; inline_data?: { data: string; mime_type: string } }> = [];
    if (request.message) {
      parts.push({ text: request.message });
    }
    if (request.fileData) {
      parts.push({ inline_data: request.fileData });
    }

    if (parts.length > 0) {
      contents.push({
        role: 'user',
        parts
      });
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = errorData.error?.message || 'Lỗi không xác định từ API';
      
      if (errorMessage.includes('API key')) {
        errorMessage = 'Lỗi xác thực API. Vui lòng kiểm tra lại cấu hình.';
      } else if (errorMessage.includes('quota')) {
        errorMessage = 'Đã hết hạn quota API. Vui lòng thử lại sau.';
      } else if (errorMessage.includes('rate limit')) {
        errorMessage = 'Quá nhiều yêu cầu. Vui lòng chờ một chút rồi thử lại.';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!responseText) {
      throw new Error('API trả về nội dung rỗng');
    }

    return responseText;
  }

  async generateDiagram(request: GeminiDiagramRequest): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY chưa được cấu hình');
    }

    // Prompt từ chatbot-sd.js của dự án cũ
    const prompt = `Bạn là chuyên gia tạo sơ đồ khối. Tạo code Mermaid.js flowchart cho yêu cầu sau.

QUY TẮC BẮT BUỘC:
1. CHỈ TRẢ VỀ CODE MERMAID, KHÔNG CÓ GIẢI THÍCH, MARKDOWN, HOẶC TEXT KHÁC
2. Bắt đầu bằng "flowchart TD" (top-down) hoặc "graph LR" (left-right)
3. ID node: chỉ dùng chữ cái thường, số, dấu gạch dưới (a-z, 0-9, _)
4. Nhãn tiếng Việt: đặt trong dấu ngoặc kép ["nhãn"]
5. Tối đa 8 node để dễ đọc
6. Dùng [] cho thao tác, {} cho điều kiện, () cho dữ liệu
7. Kết nối: --> cho mũi tên thường, -->|text| cho mũi tên có nhãn
8. Đảm bảo sơ đồ có logic rõ ràng và dễ hiểu

VÍ DỤ CHUẨN:
flowchart TD
    A["Bắt đầu"] --> B{"Kiểm tra điều kiện"}
    B -->|Đúng| C["Xử lý 1"]
    B -->|Sai| D["Xử lý 2"]
    C --> E["Kết quả"]
    D --> E

YÊU CẦU: ${request.description}

TRẢ LỜI:`;

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Lỗi khi tạo sơ đồ');
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Extract và clean Mermaid code từ response (logic từ chatbot-sd.js)
    let mermaidCode = responseText
      .trim()
      // Loại bỏ markdown code blocks
      .replace(/```mermaid\s*/gi, '')
      .replace(/```\s*$/gi, '')
      .replace(/```\w*\s*/gi, '')
      // Loại bỏ HTML comments
      .replace(/<!--.*?-->/g, '')
      // Loại bỏ CSS comments
      .replace(/\/\*.*?\*\//g, '')
      // Loại bỏ single line comments
      .replace(/\/\/.*$/gm, '')
      // Loại bỏ # comments
      .replace(/#.*$/gm, '')
      // Loại bỏ empty lines
      .replace(/\n\s*\n/g, '\n');
    
    // Tách thành lines và lọc bỏ empty lines
    let lines = mermaidCode.split('\n').filter(line => line.trim() !== '');
    
    // Tìm dòng bắt đầu flowchart/graph
    let startIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes('flowchart') || lines[i].toLowerCase().includes('graph')) {
        startIndex = i;
        break;
      }
    }
    
    // Lấy từ dòng flowchart/graph trở đi
    lines = lines.slice(startIndex);
    
    // Kiểm tra xem có phải là mermaid code không
    if (lines.length === 0 || !lines[0].toLowerCase().match(/(flowchart|graph)\s+(td|lr|bt|rl)/)) {
      throw new Error('Không thể tạo code Mermaid hợp lệ');
    }
    
    return lines.join('\n').trim();
  }
}
