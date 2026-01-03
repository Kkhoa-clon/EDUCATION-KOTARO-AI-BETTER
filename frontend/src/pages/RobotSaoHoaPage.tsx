import { Box, Container, Typography } from '@mui/material'

const RobotSaoHoaPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 200px)' }}>
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.success.main}10 50%, ${theme.palette.primary.main}10 100%)`,
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 300 }}>
            Robot Sao Hỏa
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Khám phá Sao Hỏa với robot Curiosity và Perseverance của NASA. Tìm hiểu về địa hình, khí hậu và sứ mệnh khám phá hành tinh đỏ!
          </Typography>
        </Container>
      </Box>

      <Box sx={{ flex: 1, position: 'relative', m: { xs: 2, md: 4 } }}>
        <Box
          component="iframe"
          src="/trang-chu/robot-sao-hoa-2.html"
          title="Kotaro AI - Khám Phá Sao Hỏa Cùng NASA"
          allow="clipboard-write"
          sx={{
            width: '100%',
            height: 'calc(100vh - 400px)',
            minHeight: '500px',
            border: 'none',
            bgcolor: '#fff',
            display: 'block',
          }}
        />
      </Box>
    </Box>
  )
}

export default RobotSaoHoaPage
