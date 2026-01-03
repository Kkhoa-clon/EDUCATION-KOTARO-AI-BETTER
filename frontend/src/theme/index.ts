import { createTheme } from '@mui/material/styles'

// Design Tokens - CSS Variables
export const designTokens = {
  colors: {
    // Primary - Natural Science Green
    primary: {
      main: '#22c55e', // Technological green
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff',
    },
    // Secondary - Clean grays
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // Accent colors
    accent: {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
    },
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#22c55e',
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
}

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.colors.primary.main,
      light: designTokens.colors.primary.light,
      dark: designTokens.colors.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: designTokens.colors.secondary[600],
      light: designTokens.colors.secondary[400],
      dark: designTokens.colors.secondary[800],
      contrastText: '#ffffff',
    },
    success: {
      main: designTokens.colors.success,
      contrastText: '#ffffff',
    },
    warning: {
      main: designTokens.colors.warning,
      contrastText: '#000000',
    },
    error: {
      main: designTokens.colors.error,
      contrastText: '#ffffff',
    },
    info: {
      main: designTokens.colors.info,
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: designTokens.colors.secondary[900],
      secondary: designTokens.colors.secondary[600],
      disabled: designTokens.colors.secondary[400],
    },
    divider: designTokens.colors.secondary[200],
    grey: designTokens.colors.secondary,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1: {
      fontWeight: designTokens.typography.fontWeight.light,
      fontSize: designTokens.typography.fontSize['5xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h2: {
      fontWeight: designTokens.typography.fontWeight.light,
      fontSize: designTokens.typography.fontSize['4xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h3: {
      fontWeight: designTokens.typography.fontWeight.normal,
      fontSize: designTokens.typography.fontSize['3xl'],
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h4: {
      fontWeight: designTokens.typography.fontWeight.medium,
      fontSize: designTokens.typography.fontSize['2xl'],
    },
    h5: {
      fontWeight: designTokens.typography.fontWeight.medium,
      fontSize: designTokens.typography.fontSize.xl,
    },
    h6: {
      fontWeight: designTokens.typography.fontWeight.semibold,
      fontSize: designTokens.typography.fontSize.lg,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    button: {
      textTransform: 'none',
      fontWeight: designTokens.typography.fontWeight.semibold,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    designTokens.shadows.sm,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows['2xl'],
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
            borderRadius: '6px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
            },
          },
          '&::-webkit-scrollbar-corner': {
            background: 'rgba(34, 197, 94, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.xl,
          padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
          fontSize: designTokens.typography.fontSize.sm,
          fontWeight: designTokens.typography.fontWeight.semibold,
          textTransform: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: `linear-gradient(135deg, ${designTokens.colors.primary.main} 0%, ${designTokens.colors.success} 100%)`,
          boxShadow: designTokens.shadows.md,
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.colors.primary.light} 0%, ${designTokens.colors.success} 100%)`,
            boxShadow: designTokens.shadows.lg,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: designTokens.colors.primary.main,
          color: designTokens.colors.primary.main,
          '&:hover': {
            borderColor: designTokens.colors.primary.dark,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            boxShadow: designTokens.shadows.md,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: `1px solid ${designTokens.colors.secondary[200]}`,
          borderRadius: designTokens.borderRadius['2xl'],
          boxShadow: designTokens.shadows.lg,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: designTokens.shadows.xl,
            borderColor: designTokens.colors.primary.main,
          },
        },
      },
    },
  },
})

// Default theme (bright light theme)
export const theme = lightTheme
