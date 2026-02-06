'use client';

import { Box } from '@mui/material';
import { Analytics } from '@vercel/analytics/next';

import Greeting from '@/components/Greeting-Page/Greeting';
import About from '@/components/About-Page/About';
import Projects from '@/components/Projects-Page/Projects';
import Contact from '@/components/Contact-Page/Contact';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';


const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        minHeight: '100vh',
      }}
    > 
      {/* Enables Vercel deployment analytics */}
      <Analytics />

      <Box sx={{ position: 'relative', height: '100vh' }}>
        <ParticleBackground />
        <Greeting />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />

        <Box 
          id="about"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#262624' : '#f8f9fa', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderBottom: (theme) => `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`
          }}
        >
          <About />
        </Box>

        <Box 
          id="projects"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1F1E1D' : '#f1f3f5', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderBottom: (theme) => `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`
          }}
        >
          <Projects />
        </Box>

        <Box 
          id="contact"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#141413' : '#e9ecef', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary'
          }}
        >
          <Contact />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
export default MainPage;
