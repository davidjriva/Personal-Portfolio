'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create the context
const ColorModeContext = createContext({ 
  toggleColorMode: () => {}, 
  mode: 'dark' 
});

// Custom hook for easier usage
export const useColorMode = () => useContext(ColorModeContext);

// Function to generate the theme based on the mode
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // Dark mode (Current Look)
          background: {
            default: '#282829', // Matching src/app/page.js
            paper: '#333333',   // Matching src/components/Navbar/NavBar.js
          },
          text: {
            primary: '#ffffff',
            secondary: '#C2C2C2',
          },
        }
      : {
          // Light mode
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
          text: {
            primary: '#282829',
            secondary: '#555555',
          },
        }),
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    // Removed hardcoded 'color: white' so it adapts to the palette
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

export const ColorModeProvider = ({ children }) => {
  // Default to 'dark' as per requirements
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
