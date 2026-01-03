import { Link } from 'react-router-dom'
import { Box, Container, Typography, Link as MuiLink, Stack, Grid } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import ScienceIcon from '@mui/icons-material/Science'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 4, sm: 6 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* @ts-ignore - MUI Grid item prop is valid */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon color="primary" />
                <Typography variant="h6" color="primary" fontWeight={700}>
                  KOTARO AI
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
                Nền tảng giáo dục số tích hợp trí tuệ nhân tạo, mang đến trải nghiệm học tập hiện đại và hiệu quả.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Sản phẩm
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/chatbot" color="text.secondary" variant="body2">
                Trợ Lý Sen
              </MuiLink>
              <MuiLink component={Link} to="/thu-vien" color="text.secondary" variant="body2">
                Thư Viện
              </MuiLink>
              <MuiLink component={Link} to="/thien-van" color="text.secondary" variant="body2">
                Thiên Văn
              </MuiLink>
              <MuiLink component={Link} to="/quiz" color="text.secondary" variant="body2">
                Quiz
              </MuiLink>
            </Stack>
          </Grid>

          {/* @ts-ignore - MUI Grid item prop is valid */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Tài nguyên
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI"
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                variant="body2"
              >
                GitHub
              </MuiLink>
              <MuiLink component={Link} to="/lien-he" color="text.secondary" variant="body2">
                Liên hệ
              </MuiLink>
            </Stack>
          </Grid>

          {/* @ts-ignore - MUI Grid item prop is valid */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Có câu hỏi hoặc góp ý? Hãy liên hệ với chúng tôi.
            </Typography>
            <MuiLink
              href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              <GitHubIcon fontSize="small" />
              <span>GitHub Repository</span>
            </MuiLink>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
&copy; 2025 EDUCATION KOTARO AI. All rights reserved. | Designed with by Đỗ Nguyễn Đăng Khoa & Nguyễn Văng Ngọc Tiến.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
