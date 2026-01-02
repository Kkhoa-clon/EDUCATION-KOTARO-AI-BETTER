import { Box } from '@mui/material'

const Lab2DPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)',
        p: 0,
        m: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 8,
      }}
    >
      <Box
        component="iframe"
        src="/trang-chu/lab/lab2d.html"
        title="Lab 2D"
        sx={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          bgcolor: '#fff',
          display: 'block',
        }}
      />
    </Box>
  )
}

export default Lab2DPage
