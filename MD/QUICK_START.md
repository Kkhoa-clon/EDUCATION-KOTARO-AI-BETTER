# 🚀 QUICK START GUIDE

## Cài đặt và chạy dự án

### Bước 1: Cài đặt dependencies

```bash
cd education-kotaro-ai-new
npm run install:all
```

Hoặc cài đặt riêng:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Bước 2: Cấu hình Environment Variables

**Backend:**

Tạo file `.env` trong thư mục `backend/`:

```bash
cd backend
cp .env.example .env
```

Mở file `.env` và điền các API keys thực tế:

```env
PORT=5000
NODE_ENV=development

# Lấy từ: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key

# Lấy từ: https://api.nasa.gov/
NASA_API_KEY=your_actual_nasa_api_key

# Lấy từ: https://www.emailjs.com/
EMAILJS_PUBLIC_KEY=your_actual_emailjs_public_key
EMAILJS_SERVICE_ID=service_1debdy9
EMAILJS_TEMPLATE_ID=template_7kiyjjp

FRONTEND_URL=http://localhost:5173
```

### Bước 3: Chạy Development Server

**Chạy cả Frontend và Backend cùng lúc:**

```bash
# Từ thư mục root (education-kotaro-ai-new)
npm run dev
```

Hoặc chạy riêng:

**Backend:**
```bash
cd backend
npm run dev
# Server chạy tại http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App chạy tại http://localhost:5173
```

## Kiểm tra

1. Mở browser và truy cập: `http://localhost:5173`
2. Kiểm tra backend health: `http://localhost:5000/api/health`

## Troubleshooting

### Lỗi: "concurrently is not recognized"
```bash
npm install concurrently
```

### Lỗi: "Cannot find module"
```bash
# Cài đặt lại dependencies
npm run install:all
```

### Lỗi: "API key không hợp lệ"
- Kiểm tra file `.env` đã được tạo chưa
- Kiểm tra API keys đã điền đúng chưa
- Restart backend server sau khi sửa `.env`

### Lỗi: "Port 5000 already in use"
- Đổi `PORT` trong `.env` thành port khác (ví dụ: 5001)
- Hoặc kill process đang dùng port 5000

## Cấu trúc dự án

```
education-kotaro-ai-new/
├── backend/          # Node.js Express API
│   ├── src/
│   │   ├── routes/  # API routes
│   │   ├── services/# Business logic
│   │   └── middleware/
│   └── .env         # ⚠️ Tạo từ .env.example
│
├── frontend/         # React app
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
└── package.json     # Root package (concurrently)
```

## Scripts hữu ích

```bash
# Cài đặt tất cả
npm run install:all

# Chạy development (cả 2)
npm run dev

# Build production
npm run build

# Chạy riêng backend
npm run dev:backend

# Chạy riêng frontend
npm run dev:frontend
```

---

**Lưu ý:** Luôn đảm bảo backend đang chạy trước khi test frontend!
