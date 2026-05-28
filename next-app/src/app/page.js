'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#050507',
        color: '#fafafa',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'linear-gradient(135deg, #08071a 0%, #0f0a2e 25%, #0a1628 50%, #110a24 75%, #08071a 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradShift 20s ease infinite',
          '@keyframes gradShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #070611 0%, #050507 100%)',
            width: '100%',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            bgcolor: '#050507',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #050507 0%, #040406 100%)',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
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
