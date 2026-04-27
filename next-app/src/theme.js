'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a14',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#f0f0f5',
      secondary: 'rgba(240, 240, 245, 0.5)',
    },
    primary: {
      main: '#38c0f2',
      light: '#5ed0f7',
      dark: '#1a9fd4',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6e40c9',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 800, fontSize: '3.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 800, fontSize: '2.75rem', letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.4 },
    body1: { fontWeight: 400, lineHeight: 1.7, fontSize: '0.925rem' },
    body2: { fontWeight: 400, lineHeight: 1.6, fontSize: '0.825rem' },
    caption: { fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.08em' },
    overline: { fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' },
  },
});

export default theme;
