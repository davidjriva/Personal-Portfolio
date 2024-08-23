import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar (NavBar) */}
      <NavBar />
      {/* Main content */}
      <Box 
        component="main" 
        flexGrow={1} 
        ml="200px" // Add left margin equal to the width of NavBar
        p={2} // Optional: add some padding around your content
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </Box>
    </Box>
  );
}

export default App;
