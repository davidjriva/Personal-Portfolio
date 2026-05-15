'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0c0c0e',
        color: '#e8e6e3',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212, 160, 83, 0.06) 0%, transparent 70%)',
        }}
      >
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            width: '100%',
            borderTop: '1px solid rgba(232, 230, 227, 0.06)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            width: '100%',
            borderTop: '1px solid rgba(232, 230, 227, 0.06)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            width: '100%',
            borderTop: '1px solid rgba(232, 230, 227, 0.06)',
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
