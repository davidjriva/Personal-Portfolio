'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050510',
      paper: 'rgba(255, 255, 255, 0.025)',
    },
    text: {
      primary: '#f0f0f5',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#38c0f2',
    },
    secondary: {
      main: '#6e40c9',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15 },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '1rem' },
    body2: { fontWeight: 400, lineHeight: 1.65, fontSize: '0.875rem' },
    caption: { fontWeight: 500, letterSpacing: '0.04em' },
    overline: { fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.75rem' },
  },
});

export default theme;
