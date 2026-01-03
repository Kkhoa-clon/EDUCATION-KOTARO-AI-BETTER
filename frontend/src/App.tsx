import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { theme } from './theme'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ChatbotComponent from './components/Chatbot'
import ThuVien from './pages/ThuVien'
import ThienVan from './pages/ThienVan'
import Quiz from './pages/Quiz'
import LienHe from './pages/LienHe'

// Thư viện pages
import EbookPage from './pages/EbookPage'
import HoaHocPage from './pages/HoaHocPage'
import VatLyPage from './pages/VatLyPage'
import SinhHocPage from './pages/SinhHocPage'
import NghienCuuPage from './pages/NghienCuuPage'
import OnHSGPage from './pages/OnHSGPage'

// Thiên văn pages
import HeMatTroiPage from './pages/HeMatTroiPage'
import TraiDatPage from './pages/TraiDatPage'
import TieuHanhTinhPage from './pages/TieuHanhTinhPage'
import HanhTinhKhacPage from './pages/HanhTinhKhacPage'
import ImageNASAPage from './pages/ImageNASAPage'
import RobotSaoHoaPage from './pages/RobotSaoHoaPage'

// Lab pages
import Lab2DPage from './pages/Lab2DPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: { xs: 12, sm: 14 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chatbot" element={<ChatbotComponent />} />

              {/* Thư viện routes */}
              <Route path="/thu-vien" element={<ThuVien />} />
              <Route path="/thu-vien/ebook" element={<EbookPage />} />
              <Route path="/thu-vien/hoa-hoc" element={<HoaHocPage />} />
              <Route path="/thu-vien/vat-ly" element={<VatLyPage />} />
              <Route path="/thu-vien/sinh-hoc" element={<SinhHocPage />} />
              <Route path="/thu-vien/nghien-cuu" element={<NghienCuuPage />} />
              <Route path="/thu-vien/on-hsg" element={<OnHSGPage />} />

              {/* Thiên văn routes */}
              <Route path="/thien-van" element={<ThienVan />} />
              <Route path="/thien-van/he-mat-troi" element={<HeMatTroiPage />} />
              <Route path="/thien-van/trai-dat" element={<TraiDatPage />} />
              <Route path="/thien-van/tieu-hanh-tinh" element={<TieuHanhTinhPage />} />
              <Route path="/thien-van/hanh-tinh-khac" element={<HanhTinhKhacPage />} />
              <Route path="/thien-van/image-nasa" element={<ImageNASAPage />} />
              <Route path="/thien-van/robot-sao-hoa" element={<RobotSaoHoaPage />} />

              {/* Lab routes */}
              <Route path="/lab/lab2d" element={<Lab2DPage />} />

              {/* Other routes */}
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/lien-he" element={<LienHe />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
