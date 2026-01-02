# Hướng Dẫn Phát Triển Dự Án EDUCATION KOTARO AI

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
3. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
4. [Cách Hoạt Động](#cách-hoạt-động)
5. [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)
6. [API và Services](#api-và-services)
7. [Deployment](#deployment)
8. [Testing và Troubleshooting](#testing-và-troubleshooting)

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

### Trạng Thái Hiện Tại:
- ✅ **Frontend**: Đã chuyển đổi hoàn toàn sang React với inline styles
- ⚠️ **Backend**: Cấu trúc đã sẵn sàng nhưng routes chưa được implement (chỉ có health check)
- ✅ **HTML Legacy**: Đã chuyển đổi các trang chính sang React, một số trang vẫn dùng LegacyPage component

---

## 📁 Cấu Trúc Thư Mục

```
education-kotaro-ai-new/
├── frontend/                 # Frontend React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── Header.tsx   # Header navigation (inline styles)
│   │   │   ├── Footer.tsx   # Footer (inline styles)
│   │   │   ├── Chatbot.tsx  # AI Chatbot component
│   │   │   ├── Quiz.tsx     # Quiz component (inline styles)
│   │   │   └── LegacyPage.tsx # Component để load HTML legacy
│   │   ├── pages/           # Page Components
│   │   │   ├── Home.tsx     # Trang chủ (inline styles)
│   │   │   ├── Quiz.tsx     # Trang quiz (inline styles)
│   │   │   ├── HeMatTroiPage.tsx    # Hệ Mặt Trời (inline styles)
│   │   │   ├── TraiDatPage.tsx      # Trái Đất (inline styles)
│   │   │   ├── ImageNASAPage.tsx    # Ảnh NASA APOD (inline styles)
│   │   │   ├── RobotSaoHoaPage.tsx  # Robot Sao Hỏa (iframe)
│   │   │   └── ...          # Các trang khác
│   │   ├── services/        # API Services
│   │   │   └── api.ts       # API client
│   │   ├── styles/          # Global Styles
│   │   │   └── index.css    # CSS variables và utilities (KHÔNG có Tailwind)
│   │   ├── App.tsx          # Main App component với routing
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static files
│   │   ├── trang-chu/       # Legacy HTML files (một số vẫn được dùng)
│   │   │   ├── robot-sao-hoa-2.html  # Đang được dùng
│   │   │   ├── thu-vien/    # HTML files cho thư viện (LegacyPage)
│   │   │   └── lab/         # HTML files cho lab (LegacyPage)
│   │   └── assets/          # Images, fonts, etc.
│   ├── package.json         # Dependencies (KHÔNG có Tailwind)
│   └── vite.config.ts       # Vite configuration
│
├── backend/                 # Backend API Server
│   ├── src/
│   │   ├── routes/          # API Routes (CHƯA IMPLEMENT)
│   │   │   ├── gemini.ts    # Gemini AI routes (có comment hướng dẫn)
│   │   │   ├── nasa.ts      # NASA API routes (có comment hướng dẫn)
│   │   │   └── email.ts     # Email service routes (có comment hướng dẫn)
│   │   ├── services/        # Business Logic (CHƯA IMPLEMENT)
│   │   │   ├── geminiService.ts  # Gemini AI service (có comment hướng dẫn)
│   │   │   ├── nasaService.ts    # NASA API service (có comment hướng dẫn)
│   │   │   └── emailService.ts   # Email service (có comment hướng dẫn)
│   │   ├── middleware/      # Express middleware
│   │   │   ├── errorHandler.ts  # Error handling
│   │   │   └── logger.ts        # Request logging
│   │   └── server.ts        # Express server (chỉ có health check)
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript config
│
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
- **Inline Styles**: Styling với `React.CSSProperties` (KHÔNG dùng Tailwind CSS)

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type safety
- **CORS**: Cross-origin resource sharing (chưa enable)
- **express-rate-limit**: Rate limiting (chưa sử dụng)

### External APIs
- **Google Gemini AI**: Chatbot và AI features (chưa implement)
- **NASA APIs**: 
  - APOD (Astronomy Picture of the Day) - Frontend gọi trực tiếp
  - Eyes on the Solar System - iframe embed
  - Mars Rover Photos - iframe embed
- **OpenTDB**: Quiz questions database - Frontend gọi trực tiếp

### ⚠️ Lưu Ý về Tailwind CSS
- **Tailwind CSS đã bị xóa hoàn toàn** khỏi dự án
- Không có `tailwind.config.js`, `postcss.config.js`
- Không có trong `package.json`
- **Tất cả styling sử dụng inline styles** với `React.CSSProperties`
- CSS global chỉ có CSS variables và utilities cơ bản

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
├── Header (Navigation - inline styles)
├── Routes
│   ├── Home (inline styles)
│   ├── Chatbot
│   ├── Quiz (inline styles)
│   ├── ThienVan
│   │   ├── HeMatTroiPage (inline styles)
│   │   ├── TraiDatPage (inline styles)
│   │   ├── ImageNASAPage (inline styles)
│   │   ├── RobotSaoHoaPage (iframe)
│   │   └── ...
│   └── ThuVien
│       ├── EbookPage (LegacyPage)
│       └── ... (LegacyPage)
└── Footer (inline styles)
```

#### Styling Approach
- **KHÔNG sử dụng Tailwind CSS** (đã xóa)
- Sử dụng **inline styles** với `React.CSSProperties`
- Global styles trong `styles/index.css` chỉ có:
  - CSS variables (colors, overlays)
  - Scrollbar styling
  - Responsive utilities cho desktop nav

**Ví dụ inline styles:**
```typescript
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  background: '#1c1d26',
  borderRadius: '8px',
  color: '#fff',
}

<div style={containerStyle}>Content</div>
```

**Sử dụng CSS Variables:**
```typescript
const textStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  background: 'var(--primary-dark)',
}
```

### 2. Backend Architecture

#### API Structure (Hiện tại)
```
/api
└── /health          # Health check (đang hoạt động)
```

#### API Structure (Cần implement)
```
/api
├── /health          # Health check ✅
├── /gemini          # ❌ Chưa implement
│   ├── POST /chat
│   └── POST /diagram
├── /nasa            # ❌ Chưa implement
│   └── GET /apod
└── /email           # ❌ Chưa implement
    └── POST /send
```

#### Service Layer (Chưa implement)
- **GeminiService**: File có sẵn với comment hướng dẫn
- **NasaService**: File có sẵn với comment hướng dẫn
- **EmailService**: File có sẵn với comment hướng dẫn

#### Middleware
- **errorHandler**: Có sẵn nhưng chưa được sử dụng
- **logger**: Có sẵn nhưng chưa được sử dụng
- **rateLimit**: Chưa được setup

### 3. Data Flow

#### Quiz Flow (Frontend only)
```
User config → Frontend (Quiz.tsx)
    ↓
OpenTDB API (direct call)
    ↓
Translate to Vietnamese (Google Translate API)
    ↓
Display questions
```

#### NASA APOD Flow (Frontend only)
```
User selects date → Frontend (ImageNASAPage.tsx)
    ↓
NASA API (direct call)
    ↓
Translate to Vietnamese (Lingva API)
    ↓
Display image + description
```

#### Chatbot Flow (Cần backend)
```
User Input → Frontend (Chatbot.tsx)
    ↓
POST /api/gemini/chat (❌ Chưa implement)
    ↓
Backend (geminiService.ts) (❌ Chưa implement)
    ↓
Google Gemini API
    ↓
Response → Frontend → Display
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
NODE_ENV=development

# Các API keys này cần khi implement services
# GEMINI_API_KEY=your_gemini_api_key
# NASA_API_KEY=your_nasa_api_key
# EMAIL_SERVICE_API_KEY=your_email_api_key
```

**Frontend (.env) - Tùy chọn:**
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend sẽ chạy tại: http://localhost:5000
- Health check: http://localhost:5000/api/health

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

### Testing Dự Án

#### Kiểm tra Frontend
1. Mở browser: http://localhost:5173
2. Kiểm tra các trang:
   - `/` - Trang chủ
   - `/quiz` - Quiz (hoạt động, gọi OpenTDB trực tiếp)
   - `/thien-van/he-mat-troi` - Hệ Mặt Trời (iframe NASA)
   - `/thien-van/image-nasa` - Ảnh NASA (gọi NASA API trực tiếp)
   - `/thu-vien/ebook` - Ebook (LegacyPage)

#### Kiểm tra Backend
1. Mở browser: http://localhost:5000/api/health
2. Nên thấy response:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "development",
  "message": "Backend server is running. Routes are not implemented yet."
}
```

### Thêm Tính Năng Mới

#### 1. Thêm Page Mới (Frontend)

**Bước 1:** Tạo component trong `frontend/src/pages/`
```typescript
// NewPage.tsx
const NewPage = () => {
  const pageStyle: React.CSSProperties = {
    paddingTop: '4rem',
    minHeight: '100vh',
    background: '#1c1d26',
    color: '#fff',
  }
  
  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  }
  
  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>New Page</h1>
      <p>Content here</p>
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

#### 2. Implement Backend Service

**Bước 1:** Mở file service (ví dụ: `backend/src/services/geminiService.ts`)
- File đã có comment hướng dẫn chi tiết
- Follow các TODO comments

**Bước 2:** Implement methods theo hướng dẫn trong comment

**Bước 3:** Uncomment và implement routes trong `backend/src/routes/gemini.ts`

**Bước 4:** Uncomment route registration trong `backend/src/server.ts`

#### 3. Styling Guidelines

**Sử dụng Inline Styles (BẮT BUỘC):**
```typescript
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  background: '#1c1d26',
  borderRadius: '8px',
  color: '#fff',
  // Responsive với media queries không thể dùng inline
  // Phải dùng CSS class hoặc JavaScript
}

<div style={containerStyle}>Content</div>
```

**Responsive Design:**
Vì inline styles không hỗ trợ media queries, có 2 cách:

**Cách 1:** Dùng CSS class trong `index.css`
```css
/* index.css */
.responsive-container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .responsive-container {
    padding: 2rem;
  }
}
```

```typescript
<div style={baseStyle} className="responsive-container">Content</div>
```

**Cách 2:** Dùng JavaScript với `window.innerWidth`
```typescript
const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

const containerStyle: React.CSSProperties = {
  padding: isMobile ? '1rem' : '2rem',
}
```

**CSS Variables (Khuyến nghị):**
```typescript
const textStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  background: 'var(--primary-dark)',
  borderColor: 'var(--accent-green)',
}
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

// Khi backend implement xong, sử dụng:
export const chatWithGemini = async (message: string) => {
  const response = await api.post('/gemini/chat', { message })
  return response.data
}

export const getNASAAPOD = async (date?: string) => {
  const response = await api.get('/nasa/apod', { params: { date } })
  return response.data
}
```

### Backend Services (Cần implement)

#### GeminiService
- **File:** `backend/src/services/geminiService.ts`
- **Status:** Có comment hướng dẫn, chưa implement
- **Methods cần implement:**
  - `sendChatMessage()`: Gửi tin nhắn chat
  - `generateDiagram()`: Tạo sơ đồ từ mô tả

#### NasaService
- **File:** `backend/src/services/nasaService.ts`
- **Status:** Có comment hướng dẫn, chưa implement
- **Methods cần implement:**
  - `getAPOD()`: Lấy ảnh thiên văn trong ngày
  - `getMarsPhotos()`: Lấy ảnh từ Mars Rover

#### EmailService
- **File:** `backend/src/services/emailService.ts`
- **Status:** Có comment hướng dẫn, chưa implement
- **Methods cần implement:**
  - `sendEmail()`: Gửi email
  - `sendContactEmail()`: Gửi email từ contact form

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
npm start
```

### Environment Variables Production

Đảm bảo set các biến môi trường:
- `PORT` (backend)
- `FRONTEND_URL` (backend - production URL)
- `NODE_ENV=production`
- Các API keys khi implement services

### Deployment Options

1. **Vercel/Netlify** (Frontend)
2. **Railway/Render** (Backend)
3. **Docker** (Full stack)

---

## 🔗 Liên Hệ Giữa Các Thành Phần

### Frontend ↔ Backend
- Frontend có thể gọi API qua `axios` client
- Backend hiện tại chỉ có health check
- CORS chưa được enable (cần uncomment khi implement routes)

### Components ↔ Pages
- Pages import và sử dụng Components
- Components có thể reusable across pages
- State management: Local state với `useState`, `useEffect`

### Services ↔ Routes
- Routes sẽ gọi Services để xử lý business logic (chưa implement)
- Services sẽ xử lý external API calls (chưa implement)
- Error handling sẽ được centralize trong middleware (chưa sử dụng)

---

## 📝 Best Practices

1. **TypeScript**: Luôn sử dụng types cho props, state, functions
2. **Error Handling**: Luôn có try-catch và error boundaries
3. **Code Organization**: Mỗi component/page trong file riêng
4. **Naming**: PascalCase cho components, camelCase cho functions
5. **Comments**: Comment cho logic phức tạp
6. **Performance**: Sử dụng React.memo, useMemo, useCallback khi cần
7. **Styling**: Luôn dùng inline styles với `React.CSSProperties`, KHÔNG dùng Tailwind

---

## 🧪 Testing và Troubleshooting

### Kiểm tra Dự Án Có Chạy Được Không

#### 1. Test Frontend
```bash
cd frontend
npm install
npm run dev
```

**Kỳ vọng:**
- Server chạy tại http://localhost:5173
- Không có lỗi trong console
- Trang chủ hiển thị được
- Navigation hoạt động

**Lỗi thường gặp:**
- Port 5173 đã được sử dụng → Đổi port trong `vite.config.ts`
- Module not found → Chạy `npm install` lại
- TypeScript errors → Kiểm tra `tsconfig.json`

#### 2. Test Backend
```bash
cd backend
npm install
npm run dev
```

**Kỳ vọng:**
- Server chạy tại http://localhost:5000
- Health check: http://localhost:5000/api/health trả về JSON
- Không có lỗi trong console

**Lỗi thường gặp:**
- Port 5000 đã được sử dụng → Đổi PORT trong `.env`
- Module not found → Chạy `npm install` lại
- TypeScript errors → Kiểm tra `tsconfig.json`

### Troubleshooting

#### Frontend không kết nối được Backend
- Kiểm tra backend đang chạy: http://localhost:5000/api/health
- Kiểm tra `VITE_API_URL` trong frontend `.env`
- Kiểm tra CORS settings trong backend (hiện chưa enable)

#### Tailwind CSS không hoạt động
- **Đây là đúng!** Tailwind đã bị xóa hoàn toàn
- Dự án sử dụng inline styles với `React.CSSProperties`
- Nếu cần styling, dùng inline styles hoặc CSS classes trong `index.css`

#### Backend routes không hoạt động
- **Đây là đúng!** Routes chưa được implement
- Chỉ có `/api/health` đang hoạt động
- Cần implement services và routes theo comment hướng dẫn

#### Gemini API lỗi
- Backend chưa implement GeminiService
- Cần implement theo hướng dẫn trong `backend/src/services/geminiService.ts`
- Cần `GEMINI_API_KEY` trong backend `.env`

#### NASA API lỗi
- Frontend đang gọi NASA API trực tiếp (không qua backend)
- Nếu lỗi, kiểm tra network tab trong browser
- NASA API không cần key cho APOD (có rate limit)

#### Quiz không hoạt động
- Quiz gọi OpenTDB API trực tiếp từ frontend
- Nếu lỗi, kiểm tra network tab
- Có thể do rate limit của OpenTDB

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Google Gemini API](https://ai.google.dev/docs)
- [NASA APIs](https://api.nasa.gov)
- [Vite Documentation](https://vitejs.dev)

---

## 📌 Tóm Tắt Trạng Thái Dự Án

### ✅ Đã Hoàn Thành
- Frontend React với inline styles
- Routing system hoàn chỉnh
- Các trang chính đã chuyển sang React
- Backend structure sẵn sàng
- Health check endpoint hoạt động

### ⚠️ Đang Phát Triển
- Backend routes chưa implement
- Backend services chưa implement
- Một số trang vẫn dùng LegacyPage

### ❌ Chưa Có
- Tailwind CSS (đã xóa)
- Backend API endpoints (trừ health check)
- Backend middleware (chưa enable)

---

**Cập nhật lần cuối:** 2025-01-27
**Phiên bản:** 1.1.0
**Trạng thái:** Frontend hoàn chỉnh, Backend cần implement
