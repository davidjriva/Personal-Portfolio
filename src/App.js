import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from './components';
import AnimatedRoutes from './AnimatedRoutes';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: { fontWeight: 'bold' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" minHeight="100vh">
        <NavBar />
        <Box component="main" flexGrow={1} ml="200px" p={2}>
          <Router>
            <AnimatedRoutes />
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
