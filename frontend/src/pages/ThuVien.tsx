import { Box, Container, Typography, Card, CardContent, Grid, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'

const ThuVien = () => {
  const categories = [
    { name: 'Ebook', path: '/thu-vien/ebook', icon: '📚' },
    { name: 'Hóa Học', path: '/thu-vien/hoa-hoc', icon: '🧪' },
    { name: 'Vật Lý', path: '/thu-vien/vat-ly', icon: '⚛️' },
    { name: 'Sinh Học', path: '/thu-vien/sinh-hoc', icon: '🧬' },
    { name: 'Nghiên Cứu', path: '/thu-vien/nghien-cuu', icon: '🔬' },
    { name: 'Ôn HSG', path: '/thu-vien/on-hsg', icon: '🏆' },
  ]

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          Thư Viện Số
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          Khám phá hàng ngàn tài liệu, ebook chất lượng cao về khoa học tự nhiên và công nghệ
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm sách, tài liệu..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              display: 'block',
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {categories.map((category, index) => (
            // @ts-expect-error - MUI Grid item prop is valid
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={Link}
                to={category.path}
                sx={{
                  height: '100%',
                  p: 3,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Khám phá tài liệu về {category.name.toLowerCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ThuVien
