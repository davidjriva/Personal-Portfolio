'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#06060a',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
    },
    primary: {
      main: '#38c0f2',
    },
    secondary: {
      main: '#8b5cf6',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800, fontSize: '3.5rem', letterSpacing: '-0.04em', lineHeight: 1.08 },
    h2: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.03em', lineHeight: 1.12 },
    h3: { fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em' },
    h5: { fontWeight: 600, fontSize: '1.1rem' },
    h6: { fontWeight: 600, fontSize: '0.95rem' },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
