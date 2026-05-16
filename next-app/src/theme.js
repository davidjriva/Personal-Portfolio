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
      primary: '#f0ede6',
      secondary: 'rgba(240, 237, 230, 0.6)',
    },
    primary: {
      main: '#f59e0b',
    },
    secondary: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
  },
});

export default theme;
