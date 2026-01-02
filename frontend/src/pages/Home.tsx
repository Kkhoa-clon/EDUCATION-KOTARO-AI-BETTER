import React from 'react'
import { Box, Typography, Button, Card, CardContent, Avatar, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {

  return (
    <Box>
      {/* Hero Section - Compact Design */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="img"
            src="/assets/image/logo.png"
            alt="Kotaro AI Logo"
            sx={{
              height: { xs: 60, md: 80 },
              width: 'auto',
              mb: 3,
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Education Kotaro AI
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 4, color: 'text.secondary', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
          >
            Nền tảng học tập thông minh với trí tuệ nhân tạo cho thế hệ trẻ Việt Nam
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/chatbot"
              sx={{
                minWidth: 180,
                py: 1.5,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
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
                minWidth: 180,
                py: 1.5,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(34, 197, 94, 0.05)',
                },
              }}
            >
              Khám phá thư viện
            </Button>
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
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
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
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
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
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
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

      {/* CTA Section */}
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
          <Button
            variant="outlined"
            component={Link}
            to="/thien-van/image-nasa"
            sx={{
              minWidth: 180,
              py: 1.25,
              px: 3,
              borderRadius: 2,
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
              },
            }}
          >
            Xem thêm hình ảnh
          </Button>
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
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
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
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
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
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
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
