'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0920',
      paper: 'rgba(255, 255, 255, 0.04)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.55)',
    },
    primary: {
      main: '#38c0f2',
    },
    secondary: {
      main: '#6e40c9',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 'bold', fontSize: '2.5rem' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: { fontWeight: 400, lineHeight: 1.6 },
    body2: { fontWeight: 400 },
  },
});

export default theme;
