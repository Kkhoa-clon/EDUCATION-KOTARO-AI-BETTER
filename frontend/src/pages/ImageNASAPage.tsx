import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  ZoomIn as ZoomInIcon,
  Today as TodayIcon,
  Image as ImageIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

interface APODData {
  title: string
  explanation: string
  url: string
  media_type: string
}

const ImageNASAPage = () => {

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  const apiKey = 'QjukGaZAtCoeMB9z9M2h36VG0gEauYpVOXLEPGyP'

  useEffect(() => {
    fetchAPOD()
  }, [])

  const fetchAPOD = async (date?: string) => {
    setLoading(true)
    setError('')

    const dateStr = date || selectedDate
    if (dateStr) {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateStr}`
        )
        const data = await response.json()

        if (data.error) {
          setError(data.error.message || 'Lỗi khi tải dữ liệu')
        } else {
          // Simulate translation
          setApodData({
            title: data.title,
            explanation: data.explanation,
            url: data.url,
            media_type: data.media_type,
          })
        }
      } catch (err) {
        setError('Không thể kết nối đến API NASA')
      }
    }
    setLoading(false)
  }

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
    fetchAPOD(today)
  }

  const downloadImage = () => {
    if (!apodData?.url) return

    const a = document.createElement('a')
    a.href = apodData.url
    a.download = `nasa-apod-${selectedDate}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }



  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/assets/image/galaxy-bg.jpg") no-repeat center center / cover',
            opacity: 0.3,
            animation: 'float 8s ease-in-out infinite alternate',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-5px)' },
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
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #63ff9f 0%, #28a745 100%)', // Xanh lá header
                mb: 4,
                boxShadow: '0 8px 32px rgba(100, 255, 159, 0.3)', // Tương tự như trên nhưng xanh lá
              }}
            >
              <ImageIcon sx={{ fontSize: 48, color: 'white' }} />
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
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ảnh Thiên Văn NASA
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
              Khám phá vũ trụ mỗi ngày với Ảnh Thiên Văn NASA (APOD).
              Xem, tải về và tìm hiểu ý nghĩa các bức ảnh nổi bật từ NASA.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Date Selection Card */}
        <Card
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.1)',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CalendarIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Chọn Ngày Xem Ảnh
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Chọn ngày bất kỳ để xem ảnh thiên văn NASA từ năm 1995 đến nay
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              type="date"
              label="Chọn ngày"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                onClick={() => fetchAPOD()}
                disabled={loading}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Xem Ảnh Thiên Văn'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleToday}
                startIcon={<TodayIcon />}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Ảnh Hôm Nay
              </Button>
            </Stack>
          </Stack>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.1)',
            }}
          >
            <CircularProgress size={64} sx={{ color: 'primary.main', mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Đang tải ảnh từ NASA...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Vui lòng đợi trong giây lát
            </Typography>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{
              borderRadius: 3,
              mb: 4,
              '& .MuiAlert-icon': {
                fontSize: 28,
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Không thể tải ảnh
            </Typography>
            <Typography variant="body2">
              {error}
            </Typography>
          </Alert>
        )}

        {/* APOD Display */}
        {apodData && !loading && !error && (
          <>
            {/* Title Card */}
            <Card
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
                textAlign: 'center',
              }}
            >
              <InfoIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {apodData.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Ảnh thiên văn ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
              </Typography>
            </Card>

            {/* Image Card */}
            <Card
              sx={{
                mb: 4,
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
                },
              }}
              onClick={() => setShowModal(true)}
            >
              <CardMedia
                component="img"
                image={apodData.url}
                alt={apodData.title}
                sx={{
                  width: '100%',
                  height: { xs: '300px', md: '600px' },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Nhấp vào ảnh để xem chi tiết và tải về
                </Typography>
              </Box>
            </Card>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={downloadImage}
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                  },
                }}
              >
                Tải Ảnh Về Máy
              </Button>
              <Button
                variant="outlined"
                startIcon={<ZoomInIcon />}
                onClick={() => setShowModal(true)}
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Xem Chi Tiết
              </Button>
            </Stack>

            {/* Description Card */}
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(6, 182, 212, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <InfoIcon />
                Mô tả chi tiết về bức ảnh
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                {apodData.explanation}
              </Typography>
            </Card>
          </>
        )}
      </Container>

      {/* Enhanced Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setShowModal(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.9)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>

          {apodData && (
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 700,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {apodData.title}
              </Typography>

              <Box
                component="img"
                src={apodData.url}
                alt={apodData.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: 3,
                  mb: 3,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={downloadImage}
                  sx={{
                    bgcolor: 'rgba(16, 185, 129, 0.9)',
                    '&:hover': {
                      bgcolor: 'rgba(16, 185, 129, 1)',
                    },
                  }}
                >
                  Tải Ảnh
                </Button>
              </Box>

              <Card
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Mô tả chi tiết:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.7,
                  }}
                >
                  {apodData.explanation}
                </Typography>
              </Card>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ImageNASAPage
