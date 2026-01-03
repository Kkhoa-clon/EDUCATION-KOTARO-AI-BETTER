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
import ScienceIcon from '@mui/icons-material/Science'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BiotechIcon from '@mui/icons-material/Biotech'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Link } from 'react-router-dom'

const NghienCuuPage = () => {
  const resources = [
    {
      name: 'Nghiên Cứu Khoa Học',
      icon: ScienceIcon,
      color: '#22c55e',
      description: 'Bài nghiên cứu về các hiện tượng tự nhiên',
      count: '45 nghiên cứu'
    },
    {
      name: 'Phương Pháp Nghiên Cứu',
      icon: AssessmentIcon,
      color: '#10b981',
      description: 'Kỹ thuật và phương pháp nghiên cứu khoa học',
      count: '28 tài liệu'
    },
    {
      name: 'Nghiên Cứu Ứng Dụng',
      icon: PsychologyIcon,
      color: '#059669',
      description: 'Nghiên cứu thực tiễn và ứng dụng công nghệ',
      count: '32 nghiên cứu'
    },
    {
      name: 'Nghiên Cứu Sinh Học',
      icon: BiotechIcon,
      color: '#047857',
      description: 'Nghiên cứu về sự sống và sinh học phân tử',
      count: '38 nghiên cứu'
    },
    {
      name: 'Phân Tích Dữ Liệu',
      icon: AssessmentIcon,
      color: '#065f46',
      description: 'Thống kê và phân tích dữ liệu nghiên cứu',
      count: '25 tài liệu'
    },
    {
      name: 'Xuất Bản Khoa Học',
      icon: MenuBookIcon,
      color: '#22c55e',
      description: 'Hướng dẫn viết và xuất bản bài nghiên cứu',
      count: '15 hướng dẫn'
    },
  ]

  const stats = [
    { label: 'Nghiên cứu', value: '188', icon: '🔬' },
    { label: 'Tác giả', value: '85', icon: '👥' },
    { label: 'Lĩnh vực', value: '12', icon: '📊' },
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
              Nghiên Cứu Khoa Học
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Khám phá các bài nghiên cứu khoa học chất lượng cao từ các nhà khoa học Việt Nam và quốc tế.
              Nâng cao kỹ năng nghiên cứu và phương pháp khoa học.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Nghiên Cứu Chuyên Sâu" color="primary" variant="outlined" />
              <Chip label="Phương Pháp Khoa Học" color="secondary" variant="outlined" />
              <Chip label="Xuất Bản Quốc Tế" color="success" variant="outlined" />
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
            Tài Nguyên Nghiên Cứu
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Khám phá các lĩnh vực nghiên cứu khoa học
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
            Muốn tham gia nghiên cứu?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nếu bạn quan tâm đến nghiên cứu khoa học, hãy liên hệ để được hướng dẫn và hỗ trợ.
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

export default NghienCuuPage
