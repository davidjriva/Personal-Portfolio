import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { About, Projects, Contact, NavBar, Experience, Education, Awards, Skills } from './components';

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
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
