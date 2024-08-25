import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { About, Projects, NavBar, Experience, Education, Awards, Skills } from './components';
import { AnimatePresence, motion } from 'framer-motion';

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

const AnimatedRoute = ({ component: Component }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={{ opacity: 1 }} // Animate to opacity 1
      exit={{ opacity: 0 }} // Animate out to opacity 0
      transition={{ duration: 0.5 }} // Set the duration of the transition
    >
      <Component />
    </motion.div>
  );
};

const Animated = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute component={About} />} />
        <Route path="/about" element={<AnimatedRoute component={About} />} />
        <Route path="/experience" element={<AnimatedRoute component={Experience} />} />
        <Route path="/education" element={<AnimatedRoute component={Education} />} />
        <Route path="/projects" element={<AnimatedRoute component={Projects} />} />
        <Route path="/skills" element={<AnimatedRoute component={Skills} />} />
        <Route path="/awards" element={<AnimatedRoute component={Awards} />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" minHeight="100vh">
        <NavBar />
        <Box component="main" flexGrow={1} ml="200px" p={2}>
          <Router>
            <Animated />
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
