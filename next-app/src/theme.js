'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050507',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#fafafa',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#38c0f2',
    },
    secondary: {
      main: '#a78bfa',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 800, fontSize: '3.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.1rem' },
    h6: { fontWeight: 600, fontSize: '0.95rem' },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
    caption: { fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.04em' },
    overline: { fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.12em' },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
