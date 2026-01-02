# Hướng Dẫn Phát Triển Dự Án EDUCATION KOTARO AI

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
3. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
4. [Cách Hoạt Động](#cách-hoạt-động)
5. [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)
6. [API và Services](#api-và-services)
7. [Deployment](#deployment)

---

## 🎯 Tổng Quan Dự Án

**EDUCATION KOTARO AI** là một nền tảng giáo dục số tích hợp trí tuệ nhân tạo, cung cấp các công cụ học tập khoa học hiện đại cho học sinh và giáo viên.

### Tính Năng Chính:
- 🤖 **Trợ Lý AI**: Chatbot hỗ trợ học tập với Gemini AI
- 📚 **Thư Viện Số**: Ebook, tài liệu học tập đa dạng
- 🔬 **Thí Nghiệm Ảo**: Mô phỏng 2D/3D các thí nghiệm khoa học
- 🌌 **Thiên Văn Học**: Khám phá vũ trụ với NASA Eyes
- 📝 **Quiz**: Tạo câu hỏi trắc nghiệm tự động
- 🚀 **NASA Integration**: Ảnh thiên văn, mô phỏng 3D từ NASA

---

## 📁 Cấu Trúc Thư Mục

```
education-kotaro-ai-new/
├── frontend/                 # Frontend React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── Header.tsx   # Header navigation
│   │   │   ├── Footer.tsx   # Footer
│   │   │   ├── Chatbot.tsx  # AI Chatbot component
│   │   │   └── Quiz.tsx     # Quiz component
│   │   ├── pages/           # Page Components
│   │   │   ├── Home.tsx     # Trang chủ
│   │   │   ├── Quiz.tsx     # Trang quiz
│   │   │   ├── HeMatTroiPage.tsx    # Hệ Mặt Trời
│   │   │   ├── TraiDatPage.tsx      # Trái Đất
│   │   │   ├── ImageNASAPage.tsx    # Ảnh NASA APOD
│   │   │   └── ...          # Các trang khác
│   │   ├── services/        # API Services
│   │   │   └── api.ts       # API client
│   │   ├── styles/          # Global Styles
│   │   │   └── index.css    # CSS chính (không dùng Tailwind)
│   │   ├── App.tsx          # Main App component với routing
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static files
│   │   ├── trang-chu/       # Legacy HTML files (đã chuyển sang React)
│   │   └── assets/          # Images, fonts, etc.
│   ├── package.json         # Dependencies
│   └── vite.config.ts       # Vite configuration
│
├── backend/                 # Backend API Server
│   ├── src/
│   │   ├── routes/          # API Routes
│   │   │   ├── gemini.ts    # Gemini AI routes
│   │   │   ├── nasa.ts      # NASA API routes
│   │   │   └── email.ts     # Email service routes
│   │   ├── services/        # Business Logic
│   │   │   ├── geminiService.ts  # Gemini AI service
│   │   │   ├── nasaService.ts    # NASA API service
│   │   │   └── emailService.ts   # Email service
│   │   ├── middleware/      # Express middleware
│   │   │   ├── errorHandler.ts  # Error handling
│   │   │   └── logger.ts        # Request logging
│   │   └── server.ts        # Express server setup
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript config
│
└── MD/                      # Documentation
    └── HUONG_DAN_PHAT_TRIEN.md  # File này
```

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Vite**: Build tool và dev server
- **Axios**: HTTP client
- **Inline Styles**: Styling (không dùng Tailwind/CSS external)

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type safety
- **CORS**: Cross-origin resource sharing
- **express-rate-limit**: Rate limiting

### External APIs
- **Google Gemini AI**: Chatbot và AI features
- **NASA APIs**: 
  - APOD (Astronomy Picture of the Day)
  - Eyes on the Solar System
  - Mars Rover Photos
- **OpenTDB**: Quiz questions database

---

## ⚙️ Cách Hoạt Động

### 1. Frontend Architecture

#### Routing System
- Sử dụng **React Router** để quản lý navigation
- Routes được định nghĩa trong `App.tsx`
- Mỗi page là một React component độc lập

#### Component Structure
```
App.tsx (Router)
├── Header (Navigation)
├── Routes
│   ├── Home
│   ├── Chatbot
│   ├── Quiz
│   ├── ThienVan
│   │   ├── HeMatTroiPage
│   │   ├── TraiDatPage
│   │   ├── ImageNASAPage
│   │   └── ...
│   └── ThuVien
│       ├── EbookPage
│       └── ...
└── Footer
```

#### Styling Approach
- **Không sử dụng Tailwind CSS**
- Sử dụng **inline styles** với React.CSSProperties
- Global styles trong `styles/index.css` chỉ cho:
  - CSS variables
  - Scrollbar styling
  - Responsive utilities

### 2. Backend Architecture

#### API Structure
```
/api
├── /health          # Health check
├── /gemini
│   ├── POST /chat  # Chat với Gemini AI
│   └── POST /diagram # Tạo sơ đồ
├── /nasa
│   └── GET /apod   # NASA APOD data
└── /email
    └── POST /send  # Gửi email
```

#### Service Layer
- **GeminiService**: Xử lý AI chat và diagram generation
- **NasaService**: Proxy và cache NASA API calls
- **EmailService**: Gửi email notifications

#### Middleware
- **errorHandler**: Xử lý lỗi và trả về response chuẩn
- **logger**: Log requests và responses
- **rateLimit**: Giới hạn số request để tránh abuse

### 3. Data Flow

#### Chatbot Flow
```
User Input → Frontend (Chatbot.tsx)
    ↓
POST /api/gemini/chat
    ↓
Backend (geminiService.ts)
    ↓
Google Gemini API
    ↓
Response → Frontend → Display
```

#### NASA APOD Flow
```
User selects date → Frontend (ImageNASAPage.tsx)
    ↓
GET /api/nasa/apod?date=...
    ↓
Backend (nasaService.ts)
    ↓
NASA API (cached)
    ↓
Response → Frontend → Display + Translation
```

#### Quiz Flow
```
User config → Frontend (Quiz.tsx)
    ↓
OpenTDB API (direct from frontend)
    ↓
Translate to Vietnamese
    ↓
Display questions
```

---

## 🚀 Hướng Dẫn Phát Triển

### Prerequisites
- Node.js >= 18
- npm hoặc yarn
- Git

### Setup Development Environment

#### 1. Clone Repository
```bash
git clone <repository-url>
cd education-kotaro-ai-new
```

#### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

#### 3. Environment Variables

**Backend (.env):**
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
NASA_API_KEY=your_nasa_api_key
EMAIL_SERVICE_API_KEY=your_email_api_key
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Truy cập: http://localhost:5173

### Thêm Tính Năng Mới

#### 1. Thêm Page Mới

**Bước 1:** Tạo component trong `frontend/src/pages/`
```typescript
// NewPage.tsx
const NewPage = () => {
  const pageStyle: React.CSSProperties = {
    paddingTop: '4rem',
    minHeight: '100vh',
    background: '#1c1d26',
  }
  
  return (
    <div style={pageStyle}>
      <h1>New Page</h1>
    </div>
  )
}

export default NewPage
```

**Bước 2:** Thêm route trong `App.tsx`
```typescript
import NewPage from './pages/NewPage'

// Trong Routes:
<Route path="/new-page" element={<NewPage />} />
```

**Bước 3:** Thêm link trong `Header.tsx` nếu cần

#### 2. Thêm API Endpoint Mới

**Bước 1:** Tạo service trong `backend/src/services/`
```typescript
// newService.ts
export class NewService {
  async getData(): Promise<any> {
    // Logic here
  }
}
```

**Bước 2:** Tạo route trong `backend/src/routes/`
```typescript
// newRoute.ts
import express from 'express'
import { NewService } from '../services/newService'

const router = express.Router()
const service = new NewService()

router.get('/data', async (req, res, next) => {
  try {
    const data = await service.getData()
    res.json({ status: 'success', data })
  } catch (error) {
    next(error)
  }
})

export default router
```

**Bước 3:** Đăng ký route trong `server.ts`
```typescript
import newRoutes from './routes/newRoute'
app.use('/api/new', newRoutes)
```

#### 3. Styling Guidelines

**Sử dụng Inline Styles:**
```typescript
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  background: '#1c1d26',
  borderRadius: '8px',
}

<div style={containerStyle}>Content</div>
```

**CSS Variables (từ index.css):**
```typescript
const textStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  background: 'var(--primary-dark)',
}
```

**Responsive Design:**
```typescript
const responsiveStyle: React.CSSProperties = {
  padding: '1rem',
  // Desktop
  '@media (min-width: 768px)': {
    padding: '2rem',
  }
}
// Hoặc sử dụng inline với window.innerWidth
```

---

## 🔌 API và Services

### Frontend API Client

**Location:** `frontend/src/services/api.ts`

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Gemini Chat
export const chatWithGemini = async (message: string) => {
  const response = await api.post('/gemini/chat', { message })
  return response.data
}

// NASA APOD
export const getNASAAPOD = async (date?: string) => {
  const response = await api.get('/nasa/apod', { params: { date } })
  return response.data
}
```

### Backend Services

#### GeminiService
- **Purpose**: Tích hợp Google Gemini AI
- **Methods**:
  - `sendChatMessage()`: Gửi tin nhắn chat
  - `generateDiagram()`: Tạo sơ đồ từ mô tả

#### NasaService
- **Purpose**: Proxy NASA APIs
- **Methods**:
  - `getAPOD()`: Lấy ảnh thiên văn trong ngày
  - `getMarsPhotos()`: Lấy ảnh từ Mars Rover

#### EmailService
- **Purpose**: Gửi email notifications
- **Methods**:
  - `sendEmail()`: Gửi email

---

## 📦 Deployment

### Build Production

**Frontend:**
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

**Backend:**
```bash
cd backend
npm run build
# Output: backend/dist/
```

### Environment Variables Production

Đảm bảo set các biến môi trường:
- `GEMINI_API_KEY`
- `NASA_API_KEY`
- `FRONTEND_URL` (production URL)
- `NODE_ENV=production`

### Deployment Options

1. **Vercel/Netlify** (Frontend)
2. **Railway/Render** (Backend)
3. **Docker** (Full stack)

---

## 🔗 Liên Hệ Giữa Các Thành Phần

### Frontend ↔ Backend
- Frontend gọi API qua `axios` client
- Backend xử lý và proxy đến external APIs
- CORS được cấu hình để cho phép frontend domain

### Components ↔ Pages
- Pages import và sử dụng Components
- Components có thể reusable across pages
- State management: Local state với `useState`, `useEffect`

### Services ↔ Routes
- Routes gọi Services để xử lý business logic
- Services xử lý external API calls
- Error handling được centralize trong middleware

---

## 📝 Best Practices

1. **TypeScript**: Luôn sử dụng types cho props, state, functions
2. **Error Handling**: Luôn có try-catch và error boundaries
3. **Code Organization**: Mỗi component/page trong file riêng
4. **Naming**: PascalCase cho components, camelCase cho functions
5. **Comments**: Comment cho logic phức tạp
6. **Performance**: Sử dụng React.memo, useMemo, useCallback khi cần

---

## 🐛 Troubleshooting

### Frontend không kết nối được Backend
- Kiểm tra `VITE_API_URL` trong `.env`
- Kiểm tra CORS settings trong backend
- Kiểm tra backend đang chạy

### Gemini API lỗi
- Kiểm tra `GEMINI_API_KEY` trong backend `.env`
- Kiểm tra quota API key
- Xem logs trong backend console

### NASA API lỗi
- Kiểm tra `NASA_API_KEY`
- Kiểm tra rate limits
- Xem response từ NASA API

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Google Gemini API](https://ai.google.dev/docs)
- [NASA APIs](https://api.nasa.gov)

---

**Cập nhật lần cuối:** 2025-01-27
**Phiên bản:** 1.0.0
