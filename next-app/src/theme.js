'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#fafafa',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#818cf8',
    },
    secondary: {
      main: '#c084fc',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.7)' },
    body2: { fontWeight: 400, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.5)' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
