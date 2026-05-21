'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#06060b',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#e8e6e3',
      secondary: 'rgba(255, 255, 255, 0.45)',
    },
    primary: {
      main: '#a78bfa',
    },
    secondary: {
      main: '#38bdf8',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), "Inter", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0 },
    h2: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, letterSpacing: '0.01em' },
    body2: { fontWeight: 400, lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
