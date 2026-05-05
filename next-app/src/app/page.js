'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0a0a0b',
        color: '#f0ede8',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <NavBar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(232, 168, 56, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(100, 116, 139, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          },
        }}
      >
        <HeroChat />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box id="about" sx={{ width: '100%' }}>
          <About />
        </Box>

        <Box id="projects" sx={{ width: '100%' }}>
          <Projects />
        </Box>

        <Box id="contact" sx={{ width: '100%' }}>
          <Contact />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
