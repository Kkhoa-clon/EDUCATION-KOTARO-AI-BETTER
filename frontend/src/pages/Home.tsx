import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
} from '@mui/material'
import {
  Chat as ChatIcon,
  Public as PublicIcon,
  LibraryBooks as LibraryBooksIcon,
  Star as StarIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material'

const Home: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 25%, #10b981 50%, #059669 75%, #047857 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/assets/image/bg.webp") no-repeat center center / cover',
            opacity: 0.1,
            animation: 'twinkle 4s ease-in-out infinite alternate',
          },
          '@keyframes twinkle': {
            '0%': { opacity: 0.1 },
            '100%': { opacity: 0.2 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/image/logo.webp"
                alt="Kotaro AI Logo"
                sx={{
                  height: { xs: 60, md: 80 },
                  width: 'auto',
                  mb: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
              />
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.1,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                Education
                <Box component="span" sx={{ color: '#4ade80' }}>
                  {' '}Kotaro AI
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  opacity: 0.95,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                Nền tảng học tập AI tiên tiến cho thế hệ trẻ Việt Nam.
                Khám phá vũ trụ, thử nghiệm ảo và ôn thi hiệu quả.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/chatbot"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Bắt đầu học tập
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/thu-vien"
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
                  Khám phá thư viện
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                  },
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              >
                <Box
                  component="img"
                  src="/assets/image/macbook.webp"
                  alt="Education Kotaro AI Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 700 }}>
            Thành tựu của chúng tôi
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            <Card
              sx={{
                flex: '1 1 250px',
                maxWidth: 300,
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
                  borderColor: 'primary.main',
                },
              }}
            >
              <PeopleIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
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
                10,000+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                Học sinh đã tham gia
              </Typography>
            </Card>
            <Card
              sx={{
                flex: '1 1 250px',
                maxWidth: 300,
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
                  borderColor: 'primary.main',
                },
              }}
            >
              <LibraryBooksIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
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
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                Bài giảng chất lượng
              </Typography>
            </Card>
            <Card
              sx={{
                flex: '1 1 250px',
                maxWidth: 300,
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
                  borderColor: 'primary.main',
                },
              }}
            >
              <SchoolIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
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
                Môn học được hỗ trợ
              </Typography>
            </Card>
            <Card
              sx={{
                flex: '1 1 250px',
                maxWidth: 300,
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
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
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
                24/7
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                Hỗ trợ học tập
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>


            {/* Gallery Preview Section - Compact Design */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center" sx={{ mb: 3, fontWeight: 700 }}>
          Tính Năng Mô Phỏng 3D Vũ Trụ - NASA
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/trai-dat"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/traidat.webp"
                alt="Hình ảnh Trái Đất"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Hành tinh Trái Đất
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Hình ảnh hành tinh xanh cua chúng ta từ không gian mô phỏng.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/he-mat-troi"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/hemattroi.webp"
                alt="Hình ảnh Hệ Mặt Trời"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Hệ Mặt Trời
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Khám phá các hành tinh và vệ tinh trong hệ mặt trời của chúng ta.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/tieu-hanh-tinh"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/tieuhanhtinh.webp"
                alt="Tiểu Hành Tinh"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Tiểu Hành Tinh
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Tìm hiểu về các tiểu hành tinh và vành đai tiểu hành tinh trong không gian.
                </Typography>
              </CardContent>
            </Card>
          </Box>
                    <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/hanh-tinh-khac"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/hanhtinhkhac.webp"
                alt="Hành Tinh Khác"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Hành Tinh Khác
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Khám phá các hình tinh ngoài hệ mặt trời và các hiện tượng vũ trụ thú vị.
                </Typography>
              </CardContent>
            </Card>
          </Box>
            <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/image-nasa"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/image-nasa.webp"
                alt="Ảnh Thiên Văn NASA"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Ảnh Thiên Văn NASA
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Bộ sưu tập hình ảnh thiên văn ấn tượng được cung cấp bởi NASA.
                </Typography>
              </CardContent>
            </Card>




          </Box>
            <Box sx={{ flex: '1 1 300px', maxWidth: 350 }}>
            <Card
              component={Link}
              to="/thien-van/robot-sao-hoa"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/robot-sao-hoa.webp"
                alt="Ảnh Thiên Văn NASA"
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Robot Sao Hỏa
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Tìm hiểu về các robot thám hiểm và nhiệm vụ khám phá sao Hỏa.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        </Container>
          


      {/* Key Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 700 }}>
          Tính năng nổi bật
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                flex: '2 1 400px',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(34, 197, 94, 0.15)',
                },
                border: '1px solid rgba(34, 197, 94, 0.1)',
              }}
            >
              <ChatIcon sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Chatbot AI Thông Minh
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Trợ lý ảo với trí tuệ nhân tạo giúp học sinh giải đáp thắc mắc và hướng dẫn học tập 24/7.
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                flex: '1 1 300px',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(34, 197, 94, 0.15)',
                },
                border: '1px solid rgba(34, 197, 94, 0.1)',
              }}
            >
              <PublicIcon sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Mô phỏng 3D Vũ trụ
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Khám phá các hành tinh, ngôi sao và hiện tượng vũ trụ qua công nghệ mô phỏng 3D tiên tiến.
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 600,
                width: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(34, 197, 94, 0.15)',
                },
                border: '1px solid rgba(34, 197, 94, 0.1)',
              }}
            >
              <LibraryBooksIcon sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Thư viện Tài liệu
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Bộ sưu tập tài liệu học tập phong phú với sách điện tử, bài giảng và tài nguyên đa dạng.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)',
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 700 }}>
            Phản hồi từ học sinh
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  maxWidth: 600,
                  width: '100%',
                  borderRadius: 3,
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  textAlign: 'center',
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                    "Education Kotaro AI đã giúp tôi hiểu rõ hơn về các môn khoa học. Chatbot rất thông minh và dễ sử dụng!"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>N</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Nguyễn Minh Anh
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Học sinh lớp 10
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Card
                sx={{
                  flex: '1 1 300px',
                  maxWidth: 400,
                  borderRadius: 3,
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  textAlign: 'center',
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                    "Mô phỏng 3D vũ trụ thật tuyệt vời! Tôi có thể khám phá các hành tinh như đang ở đó."
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>T</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Trần Thị Lan
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Học sinh lớp 11
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  flex: '1 1 300px',
                  maxWidth: 400,
                  borderRadius: 3,
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  textAlign: 'center',
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                    "Thư viện tài liệu rất phong phú. Tôi đã tìm được nhiều tài liệu hữu ích cho việc ôn thi."
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>L</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Lê Văn Hùng
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Học sinh lớp 12
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>






      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Sẵn sàng bắt đầu hành trình học tập?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Tham gia cùng hàng nghìn học sinh đã tin tưởng và sử dụng nền tảng của chúng tôi.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/quiz"
            sx={{ minWidth: 200 }}
          >
            Làm bài kiểm tra
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 3 }}>

        </Box>
      </Container>
            {/* Features Section - Compact Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 4, fontWeight: 700 }}>
          Trang Chủ Của Chúng Tôi
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(34, 197, 94, 0.15)',
                },
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/web1.webp"
                alt="Khoa Học Tự Nhiên"
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="h3" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Khoa Học Tự Nhiên
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Phiên Bản Đầu Tiên Của Dự Án 2024<br/>
                  https://kkhoa-clon.github.io/Website-KHTN
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(34, 197, 94, 0.15)',
                },
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/assets/image/web2.webp"
                alt="Công nghệ và Khoa học"
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="h3" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  EDUCATION KOTARO AI
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Phiên Bản Cải Tiến 2025<br/>
                  https://education-kotaro-ai.netlify.app
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(34, 197, 94, 0.15)',
                },
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="assets/image/web3.webp"
                alt="Thiên văn học"
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="h3" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  EDUCATION KOTARO AI - BETTER
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Phiên Bản Mới Nhất 2026<br/>
                  https://education-kotaro-ai-better.netlify.app
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Authors Section */}
      <Box
        sx={{
          mb: 8,
          py: 8,
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)',
          borderRadius: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 6, fontWeight: 700 }}>
            Đội ngũ phát triển
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Card
              sx={{
                maxWidth: 350,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1 }}>
                <Avatar
                  src="/assets/image/tacgia1.webp"
                  alt="Đỗ Nguyễn Đăng Khoa"
                  sx={{
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    mb: 3,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)',
                  }}
                />
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Đỗ Nguyễn Đăng Khoa
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'primary.dark', mb: 2, fontWeight: 500 }}>
                  Front End Developer
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  THPT Long Khanh A, huyện Hồng Ngự, Tỉnh Đồng Tháp
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, fontWeight: 500 }}>
                  Kỹ năng chuyên môn
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 350,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(34, 197, 94, 0.2)',
                },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1 }}>
                <Avatar
                  src="/assets/image/tacgia2.webp"
                  alt="Nguyễn Văng Ngọc Tiến"
                  sx={{
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    mb: 3,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)',
                  }}
                />
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 1, fontWeight: 600 }}>
                  Nguyễn Văng Ngọc Tiến
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'primary.dark', mb: 2, fontWeight: 500 }}>
                  Back End Developer
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  THPT Long Khanh A, huyện Hồng Ngự, Tỉnh Đồng Tháp
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, fontWeight: 500 }}>
                  Kỹ năng chuyên môn
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                  <Box component="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" sx={{ width: 36, height: 36, borderRadius: 1 }} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
