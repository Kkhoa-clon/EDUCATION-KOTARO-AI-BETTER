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
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ScienceIcon from '@mui/icons-material/Science'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BiotechIcon from '@mui/icons-material/Biotech'
import SchoolIcon from '@mui/icons-material/School'
import LanguageIcon from '@mui/icons-material/Language'
import { Link } from 'react-router-dom'

const EbookPage = () => {
  const resources = [
    {
      name: 'Sách Hóa Học',
      icon: ScienceIcon,
      color: '#22c55e',
      description: 'Các cuốn sách về hóa học từ cơ bản đến nâng cao',
      count: '45 cuốn sách'
    },
    {
      name: 'Sách Vật Lý',
      icon: PsychologyIcon,
      color: '#10b981',
      description: 'Tài liệu vật lý với hình ảnh và bài tập',
      count: '38 cuốn sách'
    },
    {
      name: 'Sách Sinh Học',
      icon: BiotechIcon,
      color: '#059669',
      description: 'Kiến thức sinh học với hình ảnh minh họa',
      count: '42 cuốn sách'
    },
    {
      name: 'Sách Giáo Khoa',
      icon: SchoolIcon,
      color: '#047857',
      description: 'Sách giáo khoa các môn khoa học tự nhiên',
      count: '28 cuốn sách'
    },
    {
      name: 'Sách Tham Khảo',
      icon: MenuBookIcon,
      color: '#065f46',
      description: 'Sách tham khảo và tài liệu bổ sung',
      count: '65 cuốn sách'
    },
    {
      name: 'Sách Ngoại Ngữ',
      icon: LanguageIcon,
      color: '#22c55e',
      description: 'Sách khoa học bằng tiếng Anh',
      count: '22 cuốn sách'
    },
  ]

  const stats = [
    { label: 'Ebook', value: '240', icon: '📚' },
    { label: 'Tác giả', value: '85', icon: '👥' },
    { label: 'Ngôn ngữ', value: '3', icon: '🌍' },
    { label: 'Đánh giá', value: '4.8/5', icon: '⭐' },
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
              Thư Viện Ebook
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Bộ sưu tập ebook chất lượng cao về khoa học tự nhiên, công nghệ và giáo dục.
              Đọc mọi lúc mọi nơi với định dạng thân thiện.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Đọc Miễn Phí" color="primary" variant="outlined" />
              <Chip label="Tải Offline" color="secondary" variant="outlined" />
              <Chip label="Đa Thiết Bị" color="success" variant="outlined" />
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
            Danh Mục Ebook
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Chọn thể loại sách bạn quan tâm
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
                        Đọc Ngay
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
            Muốn đóng góp ebook?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nếu bạn có ebook chất lượng muốn chia sẻ với cộng đồng, hãy liên hệ với chúng tôi.
          </Typography>
          <Button
            component={Link}
            to="/lien-he"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Liên Hệ Ngay
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default EbookPage
