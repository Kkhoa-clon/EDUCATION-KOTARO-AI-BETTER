import { Box } from '@mui/material'

const RobotSaoHoaPage = () => {
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
        src="/trang-chu/robot-sao-hoa-2.html"
        title="Kotaro AI - Khám Phá Sao Hỏa Cùng NASA"
        allow="clipboard-write"
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

export default RobotSaoHoaPage
