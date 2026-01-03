import { useEffect, useState } from 'react'
import { Box, Container, Typography, Card, CircularProgress } from '@mui/material'

const HanhTinhKhacPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 200px)' }}>
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.success.main}10 50%, ${theme.palette.primary.main}10 100%)`,
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 300 }}>
            Hành Tinh Ngoài Hệ Mặt Trời
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Khám phá các thế giới xa xôi ngoài Hệ Mặt Trời cùng công nghệ 3D NASA. Tìm hiểu về các exoplanet, điều kiện sống và những bí ẩn chưa được giải đáp!
          </Typography>
        </Container>
      </Box>

      <Box sx={{ flex: 1, position: 'relative', m: { xs: 2, md: 4 } }}>
        <Card
          sx={{
            height: { xs: '700px', md: 'calc(100vh - 200px)' },
            minHeight: '700px',
            overflow: 'hidden',
            bgcolor: 'black',
          }}
        >
          <Box
            sx={{
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              color: (theme) => theme.palette.primary.contrastText,
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              NASA Eyes on Exoplanets
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Khám phá các hành tinh ngoài hệ mặt trời
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
      </Box>
    </Box>
  )
}

export default HanhTinhKhacPage
