'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: 'rgba(255, 255, 255, 0.04)',
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
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    body2: { fontWeight: 400, lineHeight: 1.6 },
  },
});

export default theme;
