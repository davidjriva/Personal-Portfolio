'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0c0c0e',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#e8e6e3',
      secondary: 'rgba(232, 230, 227, 0.5)',
    },
    primary: {
      main: '#d4a053',
      light: '#e8c07a',
      dark: '#b8863a',
    },
    secondary: {
      main: '#7b8794',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 700, fontSize: '3.5rem', letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 700, fontSize: '2.75rem', letterSpacing: '-0.025em', lineHeight: 1.12 },
    h3: { fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.015em', lineHeight: 1.25 },
    h4: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.01em' },
    h5: { fontWeight: 600, fontSize: '1.1rem' },
    h6: { fontWeight: 600, fontSize: '0.95rem' },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem', letterSpacing: '0.01em' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.875rem' },
    caption: { fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
