'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/About-Page/SimpleTimeline'), { ssr: false });
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
        bgcolor: '#09090b',
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
          background: 'linear-gradient(160deg, #09090b 0%, #0f0e1a 40%, #130f20 60%, #09090b 100%)',
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

      {/* Content sections */}
      <Box id="about" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <About />
      </Box>

      <Box id="experience" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Experience />
      </Box>

      <Box id="projects" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Projects />
      </Box>

      <Box id="contact">
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
