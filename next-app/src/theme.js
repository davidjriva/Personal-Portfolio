'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0b',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#f0ede8',
      secondary: 'rgba(240, 237, 232, 0.5)',
    },
    primary: {
      main: '#e8a838',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    h1: { fontWeight: 700, fontSize: '3.5rem', letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, fontSize: '2.75rem', letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 600, fontSize: '1.75rem', letterSpacing: '-0.01em', lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em' },
    h5: { fontWeight: 600, fontSize: '1.1rem' },
    h6: { fontWeight: 600, fontSize: '0.95rem' },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
    caption: { fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
