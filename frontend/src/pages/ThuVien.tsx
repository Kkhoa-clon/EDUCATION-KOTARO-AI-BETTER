import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Stack,
  Avatar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ScienceIcon from '@mui/icons-material/Science'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BiotechIcon from '@mui/icons-material/Biotech'
import SchoolIcon from '@mui/icons-material/School'
import { Link } from 'react-router-dom'

const ThuVien = () => {
  const categories = [
    {
      name: 'Ebook',
      path: '/thu-vien/ebook',
      icon: LibraryBooksIcon,
      color: '#22c55e',
      description: 'Bộ sưu tập sách điện tử đa dạng',
      count: '500+'
    },
    {
      name: 'Hóa Học',
      path: '/thu-vien/hoa-hoc',
      icon: ScienceIcon,
      color: '#10b981',
      description: 'Tài liệu hóa học từ cơ bản đến nâng cao',
      count: '200+'
    },
    {
      name: 'Vật Lý',
      path: '/thu-vien/vat-ly',
      icon: PsychologyIcon,
      color: '#059669',
      description: 'Kiến thức vật lý hiện đại',
      count: '150+'
    },
    {
      name: 'Sinh Học',
      path: '/thu-vien/sinh-hoc',
      icon: BiotechIcon,
      color: '#047857',
      description: 'Khám phá thế giới sinh học',
      count: '180+'
    },
    {
      name: 'Nghiên Cứu',
      path: '/thu-vien/nghien-cuu',
      icon: ScienceIcon,
      color: '#065f46',
      description: 'Bài nghiên cứu khoa học chất lượng',
      count: '100+'
    },
    {
      name: 'Ôn HSG',
      path: '/thu-vien/on-hsg',
      icon: SchoolIcon,
      color: '#22c55e',
      description: 'Tài liệu ôn thi học sinh giỏi',
      count: '300+'
    },
  ]

  const stats = [
    // { label: 'Tài liệu', value: '1,400+', icon: '📚' },
    // { label: 'Danh mục', value: '6', icon: '📂' },
    // { label: 'Tác giả', value: '50+', icon: '👥' },
    // { label: 'Đánh giá', value: '4.8/5', icon: '⭐' },
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
              Thư Viện Số
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Khám phá kho tài liệu khổng lồ về khoa học tự nhiên, công nghệ và giáo dục.
              Tất cả đều miễn phí và dễ tiếp cận.
            </Typography>

            <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm sách, tài liệu, bài giảng..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  },
                }}
              />
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Miễn phí" color="primary" variant="outlined" />
              <Chip label="Cập nhật thường xuyên" color="secondary" variant="outlined" />
              <Chip label="Chất lượng cao" color="success" variant="outlined" />
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

      {/* Categories Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Danh Mục Tài Liệu
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Chọn lĩnh vực bạn quan tâm để khám phá
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  component={Link}
                  to={category.path}
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
                      '& .category-overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${category.color}20, ${category.color}05)`,
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
                        bgcolor: category.color,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40, color: 'white' }} />
                    </Avatar>

                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {category.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>

                    <Chip
                      label={`${category.count} tài liệu`}
                      size="small"
                      sx={{
                        bgcolor: `${category.color}20`,
                        color: category.color,
                        fontWeight: 600,
                      }}
                    />

                    {/* Hover overlay */}
                    <Box
                      className="category-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: `${category.color}10`,
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
                          bgcolor: category.color,
                          '&:hover': {
                            bgcolor: category.color,
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
            Cần hỗ trợ?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nếu bạn không tìm thấy tài liệu cần thiết, hãy liên hệ với chúng tôi để được hỗ trợ.
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

export default ThuVien
