'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#6366F1',
    },
    secondary: {
      main: '#C084FC',
      light: '#D8B4FE',
      dark: '#A855F7',
    },
    background: {
      default: '#09090B',
      paper: '#141419',
    },
    text: {
      primary: '#F4F4F5',
      secondary: '#71717A',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    success: {
      main: '#34D399',
    },
    error: {
      main: '#F87171',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), "Montserrat", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.7,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '0.875rem',
    },
    caption: {
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: '#09090B',
          color: '#F4F4F5',
        },
        '::selection': {
          backgroundColor: 'rgba(129, 140, 248, 0.3)',
          color: '#F4F4F5',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 10,
          padding: '10px 24px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;
