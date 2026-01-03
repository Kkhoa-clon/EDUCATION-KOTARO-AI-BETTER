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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SchoolIcon from '@mui/icons-material/School'
import ScienceIcon from '@mui/icons-material/Science'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BiotechIcon from '@mui/icons-material/Biotech'
import CalculateIcon from '@mui/icons-material/Calculate'
import { Link } from 'react-router-dom'

const OnHSGPage = () => {
  const resources = [
    {
      name: 'Ôn Thi Hóa Học HSG',
      icon: ScienceIcon,
      color: '#22c55e',
      description: 'Đề thi và bài tập hóa học nâng cao',
      count: '85 đề thi'
    },
    {
      name: 'Ôn Thi Vật Lý HSG',
      icon: PsychologyIcon,
      color: '#10b981',
      description: 'Bài toán vật lý và lý thuyết nâng cao',
      count: '92 đề thi'
    },
    {
      name: 'Ôn Thi Sinh Học HSG',
      icon: BiotechIcon,
      color: '#059669',
      description: 'Kiến thức sinh học chuyên sâu',
      count: '78 đề thi'
    },
    {
      name: 'Toán Học Nâng Cao',
      icon: CalculateIcon,
      color: '#047857',
      description: 'Bài toán toán học và giải tích',
      count: '65 bài tập'
    },
    {
      name: 'Đề Thi Mẫu',
      icon: SchoolIcon,
      color: '#065f46',
      description: 'Bộ đề thi học sinh giỏi các năm',
      count: '120 đề thi'
    },
    {
      name: 'Bài Tập Thực Hành',
      icon: EmojiEventsIcon,
      color: '#22c55e',
      description: 'Bài tập và dự án nghiên cứu',
      count: '95 bài tập'
    },
  ]

  const stats = [
    { label: 'Đề thi', value: '535', icon: '📝' },
    { label: 'Bài tập', value: '95', icon: '📚' },
    { label: 'Video HD', value: '45', icon: '🎥' },
    { label: 'Đánh giá', value: '4.9/5', icon: '⭐' },
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
              Ôn Thi Học Sinh Giỏi
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Chuẩn bị tốt nhất cho các kỳ thi học sinh giỏi với bộ tài liệu chất lượng cao,
              đề thi mẫu và phương pháp học tập hiệu quả.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Đề Thi Mẫu" color="primary" variant="outlined" />
              <Chip label="Bài Giải Chi Tiết" color="secondary" variant="outlined" />
              <Chip label="Video Giảng Dạy" color="success" variant="outlined" />
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
            Tài Nguyên Ôn Thi
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Chọn môn học bạn muốn ôn tập
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
                        Ôn Thi Ngay
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
            Cần hỗ trợ ôn thi?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nếu bạn cần tư vấn phương pháp học hoặc giải đáp thắc mắc về bài tập, hãy liên hệ ngay.
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

export default OnHSGPage
