# 📚 HƯỚNG DẪN TỔNG THỂ - EDUCATION KOTARO AI

## 🎯 Tổng Quan Dự Án

Nền tảng giáo dục số tích hợp trí tuệ nhân tạo, mang đến trải nghiệm học tập hiện đại và hiệu quả với các tính năng:

- 🤖 **Trợ Lý AI** - Chatbot với Gemini AI
- 📚 **Thư Viện Số** - Hàng ngàn tài liệu học tập
- 🔭 **Thiên Văn Học** - Khám phá vũ trụ với NASA API
- 🎯 **Quiz Trắc Nghiệm** - Ôn tập với OpenTDB API
- 🧪 **Thí Nghiệm Ảo** - Mô phỏng 2D/3D
- 📧 **Liên Hệ** - Form liên hệ với EmailJS

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN (Tiếng Việt)

### 📋 Yêu Cầu Hệ Thống
- **Node.js**: Phiên bản 18 trở lên
- **npm**: Phiên bản 8 trở lên
- **Git**: Để clone repository

### 🔧 Bước 1: Cài Đặt Dependencies

```bash
# Clone repository (nếu chưa có)
git clone https://github.com/your-repo/education-kotaro-ai-new.git
cd education-kotaro-ai-new

# Cài đặt tất cả dependencies
npm run install:all
```

Hoặc cài đặt riêng từng phần:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### ⚙️ Bước 2: Cấu Hình Environment Variables

**Quan trọng:** Phải cấu hình API keys trước khi chạy!

```bash
# Di chuyển vào thư mục backend
cd backend

# Copy file template
cp .env.example .env

# Mở file .env và điền các API keys thực tế
```

**Nội dung file `.env`:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Gemini AI API (Lấy từ: https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_actual_gemini_api_key_here

# NASA API (Lấy từ: https://api.nasa.gov/)
NASA_API_KEY=your_actual_nasa_api_key_here

# EmailJS (Lấy từ: https://www.emailjs.com/)
EMAILJS_PUBLIC_KEY=your_actual_emailjs_public_key
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=your_actual_template_id

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 🎯 Bước 3: Chạy Dự Án

**Cách 1: Chạy cả Frontend và Backend cùng lúc (Khuyến nghị)**

```bash
# Từ thư mục root (education-kotaro-ai-new)
npm run dev
```

**Cách 2: Chạy riêng từng phần**

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Server sẽ chạy tại: http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# App sẽ chạy tại: http://localhost:5173
```

### ✅ Bước 4: Kiểm Tra Hoạt Động

1. **Mở trình duyệt** và truy cập: `http://localhost:5173`
2. **Kiểm tra Backend health**: `http://localhost:5000/api/health`
3. **Test các tính năng**:
   - Chat với AI
   - Tìm kiếm sách trong thư viện
   - Xem ảnh Mars từ NASA
   - Làm quiz trắc nghiệm
   - Gửi form liên hệ

## 📁 Cấu Trúc Dự Án

```
education-kotaro-ai-new/
├── backend/                    # 🟢 Node.js Express API Server
│   ├── src/
│   │   ├── routes/            # API endpoints (Gemini, NASA, Email)
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Error handling, logging
│   │   └── server.ts          # Entry point
│   ├── .env.example           # Template cho .env
│   └── package.json
│
├── frontend/                   # 🔵 React Application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Chatbot.tsx    # AI Chat interface
│   │   │   ├── EbookLibrary.tsx # Thư viện sách
│   │   │   ├── NASAExplorer.tsx # Khám phá vũ trụ
│   │   │   ├── Quiz.tsx       # Trắc nghiệm
│   │   │   ├── ContactForm.tsx # Form liên hệ
│   │   │   ├── Header.tsx     # Navigation
│   │   │   └── Footer.tsx     # Footer
│   │   ├── pages/             # Page components
│   │   ├── services/          # API clients
│   │   ├── theme/             # MUI theme system
│   │   └── utils/             # Utilities
│   ├── public/
│   │   └── data/              # JSON data files
│   └── package.json
│
├── MD/                        # 📚 Documentation
│   ├── COMPREHENSIVE_GUIDE.md # Hướng dẫn tổng thể (file này)
│   └── ...
│
└── package.json               # Root package (concurrently)
```

## 🛠️ Scripts Hữu Ích

```bash
# Cài đặt tất cả dependencies
npm run install:all

# Chạy development (frontend + backend)
npm run dev

# Chạy riêng backend
npm run dev:backend

# Chạy riêng frontend
npm run dev:frontend

# Build production
npm run build

# Preview production build
npm run preview
```

## 🔧 Xử Lý Sự Cố (Troubleshooting)

### ❌ Lỗi: "concurrently is not recognized"
```bash
npm install concurrently
```

### ❌ Lỗi: "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### ❌ Lỗi: "API key không hợp lệ"
- Kiểm tra file `.env` đã được tạo trong `backend/`
- Kiểm tra các API keys đã được điền đúng
- Restart backend server sau khi sửa `.env`

### ❌ Lỗi: "Port 5000 already in use"
```bash
# Đổi port trong .env
PORT=5001

# Hoặc kill process
lsof -ti:5000 | xargs kill -9
```

### ❌ Lỗi: "CORS error"
- Đảm bảo backend đang chạy
- Kiểm tra `FRONTEND_URL` trong `.env`

### ❌ Lỗi: "Module not found" trong frontend
```bash
cd frontend
npm install
```

## 📊 Tính Năng Chi Tiết

### 🤖 Trợ Lý AI (Chatbot)
- **Công nghệ**: Gemini AI từ Google
- **Tính năng**:
  - Chat tiếng Việt
  - Hỗ trợ Markdown
  - Vẽ diagram với Mermaid
  - Upload hình ảnh
  - Lịch sử chat
  - Error handling

### 📚 Thư Viện Số (Ebook Library)
- **Nguồn dữ liệu**: JSON files
- **Tính năng**:
  - Tìm kiếm sách
  - Lọc theo category, ngôn ngữ, năm
  - Xem preview PDF
  - Download sách
  - Rating và đánh giá

### 🔭 Thiên Văn Học (NASA Explorer)
- **API**: NASA Mars Rover Photos API
- **Tính năng**:
  - Chọn rover (Curiosity, Opportunity, Spirit)
  - Lọc camera
  - Chọn ngày chụp
  - Gallery ảnh chất lượng cao
  - Thông tin chi tiết về ảnh

### 🎯 Quiz Trắc Nghiệm
- **API**: Open Trivia Database
- **Tính năng**:
  - Chọn category (khoa học + khác)
  - Chọn độ khó
  - Tự động dịch sang tiếng Việt
  - Tính điểm
  - Hiển thị kết quả

### 📧 Liên Hệ (Contact Form)
- **Dịch vụ**: EmailJS
- **Tính năng**:
  - Validation form
  - Gửi email
  - Thông báo thành công/lỗi
  - Loading states

## 🎨 Thiết Kế UI/UX

### Design System
- **Framework**: Material-UI (MUI) v5
- **Theme**: Dark mode với green scientific palette
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Colors**: Semantic color system (primary, success, warning, error, info)

### Responsive Design
- **Mobile-first approach**
- **Breakpoint system**: xs, sm, md, lg, xl
- **Flexible layouts** với Grid và Stack

### Accessibility
- **WCAG AA compliance**
- **Keyboard navigation**
- **Screen reader support**
- **High contrast ratios**

## 🔒 Bảo Mật và Performance

### Bảo Mật
- **API keys** được bảo vệ ở backend
- **Rate limiting** cho tất cả APIs
- **Input validation** và sanitization
- **CORS configuration** đúng cách

### Performance
- **Code splitting** với React.lazy
- **Lazy loading** components
- **Image optimization**
- **Caching strategies**

## 📈 Phát Triển và Mở Rộng

### Công Nghệ Sử Dụng
- **Frontend**: React 18, TypeScript, Vite, MUI
- **Backend**: Node.js, Express, TypeScript
- **AI**: Gemini API
- **Data**: NASA API, OpenTDB API
- **Email**: EmailJS

### Thêm Tính Năng Mới
1. **Lab Experiments**: Mô phỏng thí nghiệm ảo
2. **3D Simulations**: Các mô phỏng 3D
3. **Subject Pages**: Các trang môn học chuyên sâu
4. **User Authentication**: Đăng nhập/đăng ký
5. **Progress Tracking**: Theo dõi tiến độ học tập

### Contributing Guidelines
1. **Code Style**: ESLint + Prettier
2. **Git Flow**: Feature branches
3. **Testing**: Unit tests với Jest
4. **Documentation**: Cập nhật docs khi thay đổi

## 📞 Hỗ Trợ

### Liên Hệ
- **GitHub Issues**: Báo lỗi và yêu cầu tính năng
- **Email**: Thông qua form liên hệ trong app
- **Documentation**: File này và các file MD khác

### Cộng Đồng
- **GitHub Repository**: https://github.com/your-repo/education-kotaro-ai-new
- **Issues**: Báo cáo bugs và đề xuất
- **Pull Requests**: Đóng góp code

## 📋 Checklist Hoàn Thành

### Backend ✅
- [x] Express server với TypeScript
- [x] Gemini API proxy với rate limiting
- [x] NASA API proxy với rate limiting
- [x] EmailJS proxy với rate limiting
- [x] Error handling middleware
- [x] Request logging middleware
- [x] Environment variables template

### Frontend ✅
- [x] Material-UI integration
- [x] Dark theme với scientific green
- [x] Responsive design
- [x] Component architecture
- [x] TypeScript support
- [x] API integration

### Components ✅
- [x] Chatbot với Gemini AI
- [x] EbookLibrary với search/filter
- [x] NASAExplorer với rover photos
- [x] Quiz với OpenTDB
- [x] ContactForm với EmailJS
- [x] Header với navigation
- [x] Footer với links

### Pages ✅
- [x] Home với hero section
- [x] Chatbot page
- [x] Thư viện page
- [x] Thiên văn page
- [x] Quiz page
- [x] Liên hệ page

### Documentation ✅
- [x] Comprehensive guide (file này)
- [x] Quick start guide
- [x] Migration summary
- [x] Troubleshooting guide

## 🎊 Kết Luận

Dự án **Education Kotaro AI** đã được phát triển với công nghệ hiện đại, giao diện thân thiện và tính năng phong phú. Đây là nền tảng giáo dục số hoàn chỉnh, sẵn sàng phục vụ việc học tập và nghiên cứu.

**Trạng thái:** ✅ Production Ready
**Phiên bản:** 1.0.0
**Cập nhật cuối:** 2025-01-27

---

**Chúc bạn học tập hiệu quả với Kotaro AI! 🚀**
