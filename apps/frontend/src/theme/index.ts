import { createTheme } from '@mui/material/styles';
import typography from '../styles/typography';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light', // Default to light mode
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: typography.h1.fontSize,
      lineHeight: typography.h1.lineHeight,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: typography.h2.fontSize,
      lineHeight: typography.h2.lineHeight,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      fontSize: typography.h3.fontSize,
      lineHeight: typography.h3.lineHeight,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: typography.h4.fontSize,
      lineHeight: typography.h4.lineHeight,
    },
    h5: {
      fontWeight: 600,
      fontSize: typography.h5.fontSize,
      lineHeight: typography.h5.lineHeight,
    },
    h6: {
      fontWeight: 600,
      fontSize: typography.h6.fontSize,
      lineHeight: typography.h6.lineHeight,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: typography.body1.fontSize,
      lineHeight: typography.body1.lineHeight,
    },
    body2: {
      fontSize: typography.body2.fontSize,
      lineHeight: typography.body2.lineHeight,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: typography.caption.fontSize,
      lineHeight: typography.caption.lineHeight,
    },
    overline: {
      fontSize: typography.overline.fontSize,
      lineHeight: typography.overline.lineHeight,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '10px 24px',
          fontSize: '1rem',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;
