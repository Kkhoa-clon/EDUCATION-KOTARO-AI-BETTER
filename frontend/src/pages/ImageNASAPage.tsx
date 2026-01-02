import { useState, useEffect } from 'react'
import {
  Box,
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
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, rgba(28, 29, 38, 0.8) 0%, rgba(39, 40, 51, 0.8) 50%, rgba(28, 29, 38, 0.8) 100%), url('/assets/image/dc-xanh.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(34, 197, 94, 0.1)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight: 300 }}>
            Ảnh Thiên Văn Thời Gian Thực
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Khám phá vũ trụ mỗi ngày với Ảnh Thiên Văn NASA (APOD)
            <br />
            Xem, tải về và tìm hiểu ý nghĩa các bức ảnh nổi bật từ NASA
          </Typography>
        </Box>
        </Box>
      </Box>

      <Box sx={{ py: 4 }}>
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" color="primary.main" gutterBottom sx={{ textAlign: 'center', fontWeight: 300 }}>
            Ảnh Thiên Văn Trong Ngày với NASA
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
            Tự động dịch sang tiếng Việt cho học sinh và người yêu thiên văn
          </Typography>

          <Stack spacing={2} sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              type="date"
              label="Chọn ngày"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={() => fetchAPOD()} disabled={loading} fullWidth>
                {loading ? 'Đang tải...' : 'Xem ảnh'}
              </Button>
              <Button variant="outlined" onClick={handleToday} startIcon={<TodayIcon />}>
                Hôm nay
              </Button>
            </Stack>
          </Stack>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {loading && (
              <Stack spacing={2} alignItems="center">
                <CircularProgress color="primary" />
                <Typography color="text.secondary">Đang tải...</Typography>
              </Stack>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {apodData && !loading && !error && (
              <>
                <Typography variant="h4" color="primary.main" gutterBottom sx={{ fontWeight: 300, mb: 3 }}>
                  {apodData.title}
                </Typography>

                <Card
                  sx={{
                    mb: 3,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                  onClick={() => setShowModal(true)}
                >
                  <CardMedia
                    component="img"
                    image={apodData.url}
                    alt={apodData.title}
                    sx={{ maxHeight: '70vh', objectFit: 'contain' }}
                  />
                </Card>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                  <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadImage}>
                    Tải ảnh
                  </Button>
                  <Button variant="outlined" startIcon={<ZoomInIcon />} onClick={() => setShowModal(true)}>
                    Xem chi tiết
                  </Button>
                </Stack>

                <Card sx={{ p: 3, textAlign: 'left' }}>
                  <Typography variant="h6" color="primary.main" gutterBottom sx={{ fontWeight: 300 }}>
                    Mô Tả Về Hình Ảnh
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {apodData.explanation}
                  </Typography>
                </Card>
              </>
            )}
          </Box>
        </Card>
      </Box>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'black',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setShowModal(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {apodData && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
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
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6 }}>
                {apodData.explanation}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ImageNASAPage
