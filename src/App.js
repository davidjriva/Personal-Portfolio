import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from './components';

/*
  Load particles related JSON and JS files
*/
import options from './particles/options.json';

/* 
  Import AnimatedRoutes for handling page transitions with animations.
*/
import AnimatedRoutes from './AnimatedRoutes';

/*
  Define the theme to be used across the entire application.
  This theme customizes typography styles.
*/
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

/**
 * Main App component that wraps the application with theme and routing.
 *
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

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
