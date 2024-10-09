'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '--font-montserrat, Arial, sans-serif',
    h1: { fontWeight: 'bold', fontSize: '2.5rem' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: { fontWeight: 400, color: 'white', lineHeight: 1.6 },
    body2: { fontWeight: 400 },
  },
});

export default theme;
