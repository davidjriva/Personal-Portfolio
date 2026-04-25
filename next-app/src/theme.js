'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: '#18181b',
    },
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
    },
    primary: {
      main: '#38bdf8',
    },
    secondary: {
      main: '#a78bfa',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.7, color: '#a1a1aa' },
    body2: { fontWeight: 400, lineHeight: 1.6 },
    caption: { fontWeight: 400, letterSpacing: '0.02em' },
    overline: { fontWeight: 500, letterSpacing: '0.1em' },
  },
});

export default theme;
