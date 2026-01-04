import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useScrollTrigger,
  Slide,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import CodeIcon from '@mui/icons-material/Code'
import SchoolIcon from '@mui/icons-material/School'

interface HideOnScrollProps {
  children: React.ReactElement
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { label: 'Thư Viện', path: '/thu-vien' },
    { label: 'Trợ Lý Sen', path: '/chatbot' },
    { label: 'Thiên Văn Học', path: '/thien-van' },
    { label: 'Thí Nghiệm', path: '/lab/lab2d' },
    { label: 'Tạo Câu Hỏi', path: '/quiz' },
    { label: 'Liên Hệ', path: '/lien-he' },
  ]

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              p: 0.5,
              borderRadius: 1,
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <SchoolIcon sx={{ fontSize: 20, color: '#22c55e' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1, color: '#22c55e' }}>
              EDUCATION
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#73d239', mt: -0.5, display: 'block' }}>
              KOTARO AI
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleDrawerToggle} color="primary">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={location.pathname.startsWith(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(115, 210, 57, 0.1)',
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDrawerToggle}
          >
            <CodeIcon sx={{ mr: 1 }} />
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(16, 185, 129, 0.9) 50%, rgba(34, 197, 94, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(115, 210, 57, 0.4)',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)',
          }}
        >
          <Toolbar
            sx={{
              maxWidth: '1280px',
              width: '100%',
              mx: 'auto',
              px: { xs: 2, sm: 3 },
              minHeight: { xs: 64, sm: 72 },
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: { xs: 1, md: 0 },
                textDecoration: 'none',
                mr: { md: 6 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: { xs: 20, sm: 24 },
                    color: '#ffffff',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1,
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                  }}
                >
                  EDUCATION
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    lineHeight: 1,
                    mt: -0.25,
                    color: '#ffffff',
                  }}
                >
                  KOTARO AI
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1, ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="primary"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
              <Button
                component="a"
                href="https://github.com/Kkhoa-clon/EDUCATION-KOTARO-AI"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                startIcon={<CodeIcon />}
                sx={{
                  color: '#ffffff',
                }}
              >
                GitHub
              </Button>
            </Box>

            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'block', md: 'none' },
                ml: 1,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Header
