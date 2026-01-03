import React from 'react'
import { Box, Typography, Button, Card, CardContent, Avatar, Container, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ChatIcon from '@mui/icons-material/Chat'
import PublicIcon from '@mui/icons-material/Public'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Home: React.FC = () => {

  return (
    <Box>
      {/* Hero Section - Clean Education Design */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: { xs: 6, md: 8 },
          mb: 8,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Left Content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Box
                component="img"
                src="/assets/image/logo.png"
                alt="Kotaro AI Logo"
                sx={{
                  height: { xs: 60, md: 80 },
                  width: 'auto',
                  mb: 3,
                  display: { xs: 'block', md: 'block' },
                  mx: { xs: 'auto', md: 0 },
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Education Kotaro AI
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: { xs: '100%', md: 500 },
                }}
              >
                Nền tảng học tập thông minh với trí tuệ nhân tạo cho thế hệ trẻ Việt Nam
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/chatbot"
                  sx={{
                    minWidth: 160,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
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
                    minWidth: 160,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderWidth: 2,
                  }}
                >
                  Khám phá thư viện
                </Button>
              </Box>
            </Box>

            {/* Right Content - Statistics */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  maxWidth: 400,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Học sinh sử dụng
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                    8
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Môn học chính
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                    gridColumn: { xs: '1 / -1', sm: '1 / -1' },
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                    95%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Độ hài lòng
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
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
                src="/assets/image/traidat.png"
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
                src="/assets/image/hemattroi.png"
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
                src="/assets/image/tieuhanhtinh.png"
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
                src="/assets/image/web1.png"
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
                src="/assets/image/web2.png"
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
                src="assets/image/web3.png"
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
                  src="/assets/image/tacgia1.jpeg"
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
                  <Box component="img" src="https://vitejs.dev/logo.svg" alt="Vite" sx={{ width: 36, height: 36, borderRadius: 1 }} />
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
                  src="/assets/image/tacgia2.jpg"
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
                  <Box component="img" src="https://vitejs.dev/logo.svg" alt="Vite" sx={{ width: 36, height: 36, borderRadius: 1 }} />
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
