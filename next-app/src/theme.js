'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0f',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#e8e6e3',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#6eb6f0',
    },
    secondary: {
      main: '#a78bfa',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem', letterSpacing: '0.01em' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
    caption: { fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.75rem' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
