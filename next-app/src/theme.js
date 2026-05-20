'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a12',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#e8e8ed',
      secondary: 'rgba(255, 255, 255, 0.45)',
    },
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#a78bfa',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    body2: { fontWeight: 400, lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
