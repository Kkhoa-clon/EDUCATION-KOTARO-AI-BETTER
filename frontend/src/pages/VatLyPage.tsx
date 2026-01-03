import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Stack,
  Avatar,
} from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ScienceIcon from '@mui/icons-material/Science'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CalculateIcon from '@mui/icons-material/Calculate'
import { Link } from 'react-router-dom'

const VatLyPage = () => {
  const resources = [
    {
      name: 'Cơ Học',
      icon: PsychologyIcon,
      color: '#22c55e',
      description: 'Động lực học, tĩnh lực học và năng lượng',
      count: '35 tài liệu'
    },
    {
      name: 'Điện Từ Học',
      icon: FlashOnIcon,
      color: '#10b981',
      description: 'Điện trường, từ trường và điện từ',
      count: '28 tài liệu'
    },
    {
      name: ' Quang Học',
      icon: ScienceIcon,
      color: '#059669',
      description: 'Tính chất ánh sáng và quang phổ',
      count: '22 tài liệu'
    },
    {
      name: 'Nguyên Tử & Hạt Nhân',
      icon: ScienceIcon,
      color: '#047857',
      description: 'Cấu trúc nguyên tử và năng lượng hạt nhân',
      count: '18 tài liệu'
    },
    {
      name: 'Bài Tập & Bài Toán',
      icon: CalculateIcon,
      color: '#065f46',
      description: 'Bài tập và phương pháp giải toán vật lý',
      count: '50 bài tập'
    },
    {
      name: 'Mô Phỏng Vật Lý',
      icon: MenuBookIcon,
      color: '#22c55e',
      description: 'Thí nghiệm ảo và mô phỏng vật lý',
      count: '15 mô phỏng'
    },
  ]

  const stats = [
    { label: 'Tài liệu', value: '168', icon: '📚' },
    { label: 'Bài toán', value: '50', icon: '🧮' },
    { label: 'Mô phỏng', value: '15', icon: '🔬' },
    { label: 'Đánh giá', value: '4.6/5', icon: '⭐' },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(45deg, #22c55e, #10b981)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vật Lý
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Khám phá các định luật vật lý từ cơ bản đến nâng cao. Từ cơ học cổ điển đến vật lý hiện đại,
              với bài tập thực hành và mô phỏng tương tác.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Bài Toán Thực Hành" color="primary" variant="outlined" />
              <Chip label="Mô Phỏng 3D" color="secondary" variant="outlined" />
              <Chip label="Video Giải Thích" color="success" variant="outlined" />
            </Stack>
          </Box>

          {/* Stats */}
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {stat.icon}
                  </Typography>
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Resources Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Tài Nguyên Học Tập
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Khám phá các lĩnh vực vật lý khác nhau
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {resources.map((resource, index) => {
            const IconComponent = resource.icon
            return (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      '& .resource-overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${resource.color}20, ${resource.color}05)`,
                      p: 4,
                      textAlign: 'center',
                      position: 'relative',
                      minHeight: 280,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: resource.color,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40, color: 'white' }} />
                    </Avatar>

                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {resource.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {resource.description}
                    </Typography>

                    <Chip
                      label={resource.count}
                      size="small"
                      sx={{
                        bgcolor: `${resource.color}20`,
                        color: resource.color,
                        fontWeight: 600,
                      }}
                    />

                    {/* Hover overlay */}
                    <Box
                      className="resource-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: `${resource.color}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: resource.color,
                          '&:hover': {
                            bgcolor: resource.color,
                            opacity: 0.9,
                          },
                        }}
                      >
                        Khám phá ngay
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            p: 6,
            borderRadius: 4,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Cần hỗ trợ học vật lý?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nếu bạn gặp khó khăn với các khái niệm vật lý, hãy liên hệ để được giải đáp và hỗ trợ.
          </Typography>
          <Button
            component={Link}
            to="/lien-he"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Liên Hệ Hỗ Trợ
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default VatLyPage
