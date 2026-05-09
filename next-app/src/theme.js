'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: '#131316',
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa',
    },
    primary: {
      main: '#6366f1',
      light: '#818cf8',
    },
    secondary: {
      main: '#a855f7',
      light: '#c084fc',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0 },
    h2: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    body2: { fontWeight: 400, lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
