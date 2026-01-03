
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material'
import {
  Public as PublicIcon,
  Satellite as SatelliteIcon,
  Image as ImageIcon,
  RocketLaunch as RocketLaunchIcon,
  Star as StarIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const ThienVan = () => {

  const features = [
    {
      icon: <PublicIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Hệ Mặt Trời',
      description: 'Khám phá các hành tinh, vệ tinh và tiểu hành tinh trong hệ mặt trời với mô phỏng 3D.',
      path: '/thien-van/he-mat-troi',
      color: '#22c55e',
      bgImage: '/assets/image/hemattroi-bg.jpg',
    },
    {
      icon: <SatelliteIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Trái Đất',
      description: 'Quan sát hành tinh xanh từ không gian, tìm hiểu về khí hậu, địa chất và đại dương.',
      path: '/thien-van/trai-dat',
      color: '#22c55e',
      bgImage: '/assets/image/traidat-bg.jpg',
    },
    {
      icon: <StarIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Tiểu Hành Tinh',
      description: 'Khám phá các tiểu hành tinh, thiên thạch và các vật thể nhỏ trong hệ mặt trời.',
      path: '/thien-van/tieu-hanh-tinh',
      color: '#22c55e',
      bgImage: '/assets/image/tieuhanhtinh-bg.jpg',
    },
    {
      icon: <ExploreIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Hành Tinh Khác',
      description: 'Khám phá các thế giới xa xôi ngoài Hệ Mặt Trời cùng công nghệ 3D NASA.',
      path: '/thien-van/hanh-tinh-khac',
      color: '#22c55e',
      bgImage: '/assets/image/hanh tinh-bg.jpg',
    },
    {
      icon: <ImageIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Ảnh Thiên Văn NASA',
      description: 'Xem ảnh thiên văn hàng ngày từ NASA, tự động dịch và giải thích bằng tiếng Việt.',
      path: '/thien-van/image-nasa',
      color: '#22c55e',
      bgImage: '/assets/image/nasa-bg.jpg',
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Robot Sao Hỏa',
      description: 'Khám phá hình ảnh từ các tàu thám hiểm Mars Rover của NASA.',
      path: '/thien-van/robot-sao-hoa',
      color: '#22c55e',
      bgImage: '/assets/image/saohoa-bg.jpg',
    },
  ]

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
            background: 'url("/assets/image/stars-bg.png") repeat',
            opacity: 0.3,
            animation: 'twinkle 6s ease-in-out infinite alternate',
          },
          '@keyframes twinkle': {
            '0%': { opacity: 0.3 },
            '100%': { opacity: 0.4 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              Thiên Văn Học
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
              Khám phá vũ trụ với dữ liệu thời gian thực từ NASA và mô phỏng 3D tương tác.
              Trải nghiệm các hành tinh, ngôi sao và hiện tượng vũ trụ như chưa từng có.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/thien-van/image-nasa"
                sx={{
                  backgroundColor: 'rgba(34,197,94,0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34,197,94,0.5)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(34,197,94,1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(34,197,94,0.4)',
                  },
                }}
              >
                Xem Ảnh NASA
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/thien-van/he-mat-troi"
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Khám Phá Hệ Mặt Trời
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Các Chủ Đề Thiên Văn
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Khám phá các lĩnh vực thiên văn học với công nghệ tiên tiến và dữ liệu từ NASA
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={Link}
                to={feature.path}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  background: `linear-gradient(135deg, ${feature.color}08 0%, ${feature.color}04 100%)`,
                  border: `1px solid ${feature.color}20`,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: `0 20px 40px ${feature.color}30`,
                    borderColor: feature.color,
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${feature.color}10 0%, ${feature.color}05 100%)`,
                    borderBottom: `1px solid ${feature.color}20`,
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                      mb: 3,
                      transition: 'all 0.3s ease',
                      boxShadow: `0 8px 20px ${feature.color}20`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      mb: 3,
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: 2,
                      py: 1.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${feature.color}dd 0%, ${feature.color} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${feature.color}40`,
                      },
                    }}
                  >
                    Khám phá →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Dữ Liệu Thiên Văn
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                <PublicIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography
                  variant="h3"
                  sx={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  8
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Hành tinh
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                <SatelliteIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography
                  variant="h3"
                  sx={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  200+
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Vệ tinh tự nhiên
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                <ImageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography
                  variant="h3"
                  sx={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  1000+
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Ảnh thiên văn
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                <RocketLaunchIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography
                  variant="h3"
                  sx={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  5
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Tàu vũ trụ hoạt động
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default ThienVan
