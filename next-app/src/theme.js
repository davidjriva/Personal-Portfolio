'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#07070a',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#f5f5f7',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#22d3ee',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), var(--font-montserrat), Arial, sans-serif',
    h1: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-montserrat), Arial, sans-serif',
      fontWeight: 600,
    },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    body2: { fontWeight: 400, lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
