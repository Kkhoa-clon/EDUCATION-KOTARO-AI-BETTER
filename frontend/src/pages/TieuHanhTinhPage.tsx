import { useEffect, useState } from 'react'
import { Box, Container, Typography, Card, CircularProgress } from '@mui/material'

const TieuHanhTinhPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 200px)' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1c1d26 0%, #272833 50%, #1c1d26 100%)',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 300 }}>
            Tiểu Hành Tinh
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Khám phá các tiểu hành tinh, thiên thạch và các vật thể nhỏ trong hệ mặt trời. Tìm hiểu về nguồn gốc, đặc điểm và vai trò của chúng trong vũ trụ!
          </Typography>
        </Container>
      </Box>

      <Box sx={{ flex: 1, position: 'relative', m: { xs: 2, md: 4 } }}>
        <Card
          sx={{
            height: { xs: '500px', md: 'calc(100vh - 400px)' },
            minHeight: '500px',
            overflow: 'hidden',
            bgcolor: 'black',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(90deg, #73d239, #8ee63e)',
              color: 'black',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              NASA Eyes on Asteroids
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Khám phá các tiểu hành tinh và thiên thạch
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', height: 'calc(100% - 80px)' }}>
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'black',
                  zIndex: 10,
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            )}
            <Box
              component="iframe"
              src="https://eyes.nasa.gov/apps/asteroids/#/home"
              allowFullScreen
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                bgcolor: 'black',
              }}
              title="NASA Eyes on Asteroids"
              onLoad={() => setLoading(false)}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default TieuHanhTinhPage
