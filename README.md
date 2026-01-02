# EDUCATION KOTARO AI - Phiên bản mới

## 🚀 Giới thiệu

Đây là phiên bản mới của **EDUCATION KOTARO AI**, được tái cấu trúc hoàn toàn với stack hiện đại:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **State Management**: Zustand (hoặc React Context)
- **Routing**: React Router v6

## 📋 Tính năng

- ✅ Trợ lý AI (Chatbot với Gemini API) - **Đang phát triển**
- ✅ Thư viện số (Ebook, tài liệu) - **Đang phát triển**
- ✅ Thí nghiệm ảo 2D/3D - **Đang phát triển**
- ✅ Quiz và ôn luyện - **Đang phát triển**
- ✅ Mô phỏng thiên văn học (NASA API) - **Đang phát triển**
- ✅ Liên hệ qua EmailJS - **Đang phát triển**

## 🛠️ Cài đặt

### Yêu cầu

- Node.js >= 18.0.0
- npm >= 9.0.0

### Bước 1: Cài đặt tất cả dependencies

```bash
npm run install:all
```

Hoặc cài đặt riêng:

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Bước 2: Cấu hình Environment Variables

**Backend:**

Tạo file `.env` trong thư mục `backend/`:

```bash
cd backend
cp .env.example .env
```

Điền các giá trị thực tế vào `.env`:

```env
PORT=5000
NODE_ENV=development

GEMINI_API_KEY=your_gemini_api_key_here
NASA_API_KEY=your_nasa_api_key_here

EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
EMAILJS_SERVICE_ID=service_1debdy9
EMAILJS_TEMPLATE_ID=template_7kiyjjp

FRONTEND_URL=http://localhost:5173
```

**Frontend (tùy chọn):**

Tạo file `.env` trong thư mục `frontend/` nếu cần:

```env
VITE_API_URL=http://localhost:5000
```

### Bước 3: Chạy Development

**Chạy cả Frontend và Backend cùng lúc:**

```bash
npm run dev
```

Hoặc chạy riêng:

**Backend:**
```bash
npm run dev:backend
# hoặc
cd backend && npm run dev
```

Backend sẽ chạy tại: `http://localhost:5000`

**Frontend:**
```bash
npm run dev:frontend
# hoặc
cd frontend && npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 📁 Cấu trúc dự án

```
education-kotaro-ai-new/
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── routes/          # API routes (gemini.ts, nasa.ts, email.ts)
│   │   ├── services/        # Business logic (geminiService.ts, nasaService.ts, emailService.ts)
│   │   ├── middleware/      # Middleware (errorHandler.ts, logger.ts)
│   │   └── server.ts        # Entry point
│   ├── .env                 # Environment variables (KHÔNG COMMIT)
│   ├── .env.example         # Template cho .env
│   ├── tsconfig.json
│   └── package.json
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Reusable components (Header, Footer, Chatbot, v.v.)
│   │   ├── pages/           # Page components (Home, Chatbot, ThuVien, v.v.)
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API clients (api.ts)
│   │   ├── utils/           # Utilities (errorHandler.ts)
│   │   ├── styles/          # Global styles (index.css)
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
├── package.json             # Root package (concurrently)
└── README.md
```

## 🔧 Scripts

### Root (chạy cả frontend và backend)

- `npm run dev` - Chạy cả frontend và backend cùng lúc
- `npm run build` - Build cả frontend và backend
- `npm run install:all` - Cài đặt dependencies cho cả hai

### Backend

- `npm run dev` - Chạy development server với hot reload (nodemon)
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server
- `npm run type-check` - Kiểm tra TypeScript

### Frontend

- `npm run dev` - Chạy development server (Vite)
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🔒 Bảo mật

- ✅ API keys được lưu ở backend (`.env`), không lộ ở frontend
- ✅ Rate limiting cho các API endpoints
- ✅ CORS được cấu hình đúng
- ✅ Error handling tập trung
- ✅ `.env` đã được thêm vào `.gitignore`

## 📚 API Endpoints

### Backend API (http://localhost:5000)

#### Health Check
- `GET /api/health` - Kiểm tra trạng thái server

#### Gemini API
- `POST /api/gemini/chat` - Chat với Gemini
  ```json
  {
    "message": "Xin chào",
    "chatHistory": [],
    "systemPrompt": "...",
    "fileData": null
  }
  ```
- `POST /api/gemini/diagram` - Tạo sơ đồ khối
  ```json
  {
    "description": "Tạo sơ đồ thuật toán tính tổng"
  }
  ```

#### NASA API
- `GET /api/nasa/rovers` - Lấy thông tin Mars Rovers
- `GET /api/nasa/photos?rover=curiosity&earth_date=2024-01-01` - Lấy ảnh Mars

#### Email API
- `POST /api/email/send` - Gửi email
  ```json
  {
    "user_email": "user@example.com",
    "message": "Nội dung tin nhắn",
    "recaptcha_token": "token..."
  }
  ```

## 🚀 Deploy

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy thư mục dist/
```

**Environment Variables:**
- `VITE_API_URL` - URL của backend API

### Backend (Render/Heroku/Railway)

```bash
cd backend
npm run build
npm start
```

**Environment Variables:**
- Tất cả các biến trong `.env.example`

## 📝 Lưu ý

1. **Backend PHẢI chạy** trước khi frontend hoạt động đầy đủ
2. **File `.env` KHÔNG được commit** vào git
3. **API keys** phải được cấu hình đúng trong `.env`
4. **Rate limiting** đã được thiết lập để bảo vệ API

## 🤝 Đóng góp

Dự án này là mã nguồn mở. Mọi đóng góp đều được chào đón!

## 📄 License

MIT

---

**Version:** 1.0.0  
**Status:** Đang phát triển  
**Last Updated:** 2025-01-27
# EDUCATION-KOTARO-AI-BETTER
