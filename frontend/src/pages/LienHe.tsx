import { Box, Container, Typography, Card, Stack, TextField, Button, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const LienHe = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          Liên Hệ
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          Có câu hỏi hoặc góp ý? Hãy liên hệ với chúng tôi
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4 }}>
              <Stack spacing={3}>
                <TextField fullWidth label="Họ và tên" variant="outlined" />
                <TextField fullWidth label="Email" type="email" variant="outlined" />
                <TextField fullWidth label="Tiêu đề" variant="outlined" />
                <TextField
                  fullWidth
                  label="Nội dung"
                  multiline
                  rows={6}
                  variant="outlined"
                />
                <Button variant="contained" size="large" startIcon={<SendIcon />} sx={{ alignSelf: 'flex-start' }}>
                  Gửi tin nhắn
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <EmailIcon color="primary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      education-kotaro@gmail.com
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PhoneIcon color="primary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Điện thoại
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +84 916 096 112
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnIcon color="primary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Địa chỉ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Đồng Tháp, Hồng Ngự, Việt Nam
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default LienHe
