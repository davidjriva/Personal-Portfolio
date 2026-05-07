'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#06060a',
      paper: '#0f0f16',
    },
    text: {
      primary: '#e8e8ed',
      secondary: '#6b6b80',
    },
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    secondary: {
      main: '#a78bfa',
      light: '#c4b5fd',
      dark: '#8b5cf6',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-montserrat), system-ui, -apple-system, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.3 },
    h5: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.4 },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem', color: '#a0a0b0' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem', color: '#8888a0' },
    caption: { fontSize: '0.75rem', color: '#6b6b80', lineHeight: 1.5 },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#60a5fa',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
