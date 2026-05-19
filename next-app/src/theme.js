'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#fafafa',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#818cf8',
    },
    secondary: {
      main: '#34d399',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    h1: {
      fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: { fontWeight: 600, letterSpacing: '-0.015em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
    caption: { fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.75rem' },
  },
});

export default theme;
