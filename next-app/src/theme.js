'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '--font-montserrat, Arial, sans-serif',
    h1: { fontWeight: 'bold', fontSize: '2.5rem', color: 'white' },
    h2: { fontWeight: 'bold', color: 'white' },
    h3: { fontWeight: 'bold', color: 'white' },
    h4: { fontWeight: 'bold', color: 'white' },
    h5: { fontWeight: 'bold', color: 'white' },
    h6: { fontWeight: 'bold', color: 'white' },
    body1: { fontWeight: 400, color: 'white', lineHeight: 1.6 },
    body2: { fontWeight: 400, color: 'white' },
  },
});

export default theme;
