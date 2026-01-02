import { Box, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import SatelliteIcon from '@mui/icons-material/Satellite'
import ImageIcon from '@mui/icons-material/Image'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Link } from 'react-router-dom'

const ThienVan = () => {
  const features = [
    {
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      title: 'Hệ Mặt Trời',
      description: 'Khám phá các hành tinh, vệ tinh và tiểu hành tinh trong hệ mặt trời với mô phỏng 3D tương tác.',
      path: '/thien-van/he-mat-troi',
    },
    {
      icon: <SatelliteIcon sx={{ fontSize: 40 }} />,
      title: 'Trái Đất',
      description: 'Quan sát hành tinh xanh từ không gian, tìm hiểu về khí hậu, địa chất và đại dương.',
      path: '/thien-van/trai-dat',
    },
    {
      icon: <SatelliteIcon sx={{ fontSize: 40 }} />,
      title: 'Tiểu Hành Tinh',
      description: 'Khám phá các tiểu hành tinh, thiên thạch và các vật thể nhỏ trong hệ mặt trời.',
      path: '/thien-van/tieu-hanh-tinh',
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      title: 'Hành Tinh Khác',
      description: 'Khám phá các thế giới xa xôi ngoài Hệ Mặt Trời cùng công nghệ 3D NASA.',
      path: '/thien-van/hanh-tinh-khac',
    },
    {
      icon: <ImageIcon sx={{ fontSize: 40 }} />,
      title: 'Ảnh Thiên Văn NASA',
      description: 'Xem ảnh thiên văn hàng ngày từ NASA, tự động dịch và giải thích bằng tiếng Việt.',
      path: '/thien-van/image-nasa',
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
      title: 'Robot Sao Hỏa',
      description: 'Khám phá hình ảnh từ các tàu thám hiểm Mars Rover của NASA.',
      path: '/thien-van/robot-sao-hoa',
    },
  ]

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          Thiên Văn Học
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          Khám phá vũ trụ với dữ liệu thời gian thực từ NASA và mô phỏng 3D tương tác
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            // @ts-expect-error - MUI Grid item prop is valid
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={Link}
                to={feature.path}
                sx={{
                  height: '100%',
                  p: 4,
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Box sx={{ color: 'primary.main', mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Button variant="outlined" size="small">
                    Khám phá →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ThienVan
