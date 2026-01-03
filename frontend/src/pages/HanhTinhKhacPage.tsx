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
  Star as StarIcon,
  Science as ScienceIcon,
  Visibility as VisibilityIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material'

const HanhTinhKhacPage = () => {
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
            background: 'url("/assets/image/exoplanets-bg.jpg") no-repeat center center / cover',
            opacity: 0.2,
            animation: 'float 16s ease-in-out infinite alternate',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-4px)' },
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
              <StarIcon sx={{ fontSize: 60, color: 'white' }} />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.5rem' },
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
              Hành Tinh Ngoài Hệ Mặt Trời
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
              Khám phá các thế giới xa xôi ngoài Hệ Mặt Trời cùng công nghệ 3D NASA. Tìm hiểu về các exoplanet, điều kiện sống và những bí ẩn chưa được giải đáp!
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
                label="Nghiên cứu Vũ trụ"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  '& .MuiChip-icon': { color: '#22c55e' },
                }}
              />
              <Chip
                icon={<VisibilityIcon />}
                label="Quan sát Exoplanets"
                sx={{
                  bgcolor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  '& .MuiChip-icon': { color: '#22c55e' },
                }}
              />
              <Chip
                icon={<ExploreIcon />}
                label="Khám phá Thế giới Xa xôi"
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
              NASA Eyes on Exoplanets
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
              Công cụ tương tác 3D từ NASA cho phép bạn khám phá các hành tinh quay quanh các ngôi sao khác.
              Quan sát kích thước, khoảng cách, và điều kiện vật lý của hàng nghìn exoplanet đã được phát hiện.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              💡 Mẹo: Tìm hiểu về các "nhiệt đới" (hot Jupiters) và các hành tinh có khả năng có sự sống
            </Typography>
          </Card>
        </Stack>

        {/* Interactive Exoplanets Viewer */}
        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
            minHeight: { xs: '600px', md: '700px' },
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
              NASA Eyes on Exoplanets
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Khám phá các hành tinh ngoài hệ mặt trời • Công cụ 3D từ NASA
            </Typography>
          </Box>

          {/* Iframe Container */}
          <Box sx={{ position: 'relative', height: { xs: '500px', md: '600px' } }}>
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
                  Đang tải dữ liệu exoplanets...
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  Vui lòng đợi trong giây lát<br />
                  Đang kết nối với dữ liệu thiên văn
                </Typography>
              </Box>
            )}
            <Box
              component="iframe"
              src="https://eyes.nasa.gov/apps/exo/#/"
              allowFullScreen
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                bgcolor: 'black',
              }}
              title="NASA Eyes on Exoplanets"
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
            Khám phá exoplanets:
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              • <strong>Phát hiện exoplanets:</strong> Hơn 5000 hành tinh ngoài hệ mặt trời đã được xác nhận
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Vùng có thể ở được:</strong> Các hành tinh ở khoảng cách phù hợp với ngôi sao mẹ để có nước ở dạng lỏng
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Đa dạng hành tinh:</strong> Từ đá như Trái Đất đến khí khổng lồ như Sao Mộc
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • <strong>Tương lai khám phá:</strong> Các sứ mệnh không gian để tìm kiếm dấu hiệu sự sống
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  )
}

export default HanhTinhKhacPage
