import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { About, Projects, Contact, NavBar, Home, Experience, Education, Awards, Skills } from './components';

function App() {
  return (
    <Box display="flex" minHeight="100vh">
      <NavBar />
      <Box component="main" flexGrow={1} ml="200px" p={2}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
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
  );
}

export default App;
