import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const EbookPage = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
          Thư Viện Ebook
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            // @ts-expect-error - MUI Grid item prop is valid
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <MenuBookIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Ebook {item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mô tả ebook...
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

export default EbookPage
