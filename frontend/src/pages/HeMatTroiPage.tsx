import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material'
import {
  Public as PublicIcon,
  Science as ScienceIcon,
  Visibility as VisibilityIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material'

const HeMatTroiPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/assets/image/solar-system-bg.jpg") no-repeat center center / cover',
            opacity: 0.2,
            animation: 'float 10s ease-in-out infinite alternate',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                mb: 4,
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
              }}
            >
              <PublicIcon sx={{ fontSize: 60, color: 'white' }} />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hệ Mặt Trời
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6,
                opacity: 0.9,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              Khám phá vũ trụ với công cụ tương tác 3D từ NASA. Trải nghiệm Hệ Mặt Trời như chưa từng có với công nghệ Eyes on the Solar System.
            </Typography>

            {/* Feature Chips */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <Chip
                icon={<ScienceIcon />}
                label="Công nghệ NASA"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  '& .MuiChip-icon': { color: '#22c55e' },
                }}
              />
              <Chip
                icon={<VisibilityIcon />}
                label="3D Tương tác"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  '& .MuiChip-icon': { color: '#22c55e' },
                }}
              />
              <Chip
                icon={<ExploreIcon />}
                label="Khám phá Vũ trụ"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  '& .MuiChip-icon': { color: '#22c55e' },
                }}
              />
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Info Cards */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.1)',
              boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NASA Eyes on the Solar System
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
              Công cụ tương tác 3D chính thức từ NASA cho phép bạn khám phá Hệ Mặt Trời một cách sống động.
              Quan sát các hành tinh, vệ tinh, tiểu hành tinh và tàu vũ trụ trong không gian 3D thực tế.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              💡 Mẹo: Sử dụng chuột để xoay, zoom và điều hướng trong không gian 3D
            </Typography>
          </Card>
        </Stack>

        {/* Interactive Solar System Viewer */}
        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
            minHeight: { xs: '600px', md: '800px' },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              NASA Eyes on the Solar System
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Công cụ tương tác 3D chính thức từ NASA • Khám phá vũ trụ theo thời gian thực
            </Typography>
          </Box>

          {/* Iframe Container */}
          <Box sx={{ position: 'relative', height: { xs: '500px', md: '700px' } }}>
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                  zIndex: 10,
                  backdropFilter: 'blur(5px)',
                }}
              >
                <CircularProgress size={64} sx={{ color: '#22c55e', mb: 3 }} />
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Đang tải công cụ NASA...
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  Vui lòng đợi trong giây lát<br />
                  Công cụ 3D đang được khởi tạo
                </Typography>
              </Box>
            )}
            <Box
              component="iframe"
              src="https://eyes.nasa.gov/apps/solar-system/#/home"
              allowFullScreen
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                bgcolor: 'black',
              }}
              title="NASA Eyes on the Solar System"
              onLoad={() => setLoading(false)}
            />
          </Box>
        </Card>

        {/* Additional Info */}
        <Card
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: '#16a34a',
            }}
          >
            Tính năng chính của công cụ:
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              • <strong>Quan sát 3D:</strong> Xem các hành tinh và vệ tinh trong không gian 3D thực tế
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Dữ liệu thời gian thực:</strong> Theo dõi vị trí thực tế của các vật thể trong hệ mặt trời
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Tàu vũ trụ:</strong> Theo dõi các sứ mệnh không gian đang hoạt động
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Tiểu hành tinh:</strong> Khám phá các vật thể gần Trái Đất
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  )
}

export default HeMatTroiPage
