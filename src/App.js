import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'; // Import Box

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E90FF', // Primary Blue
    },
    secondary: {
      main: '#007BFF', // Secondary Blue
    },
    background: {
      default: '#ADD8E6',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  spacing: 8,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1}>
          <Router>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
