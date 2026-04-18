'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const HeroChat = dynamic(() => import('@/components/Greeting-Page/HeroChat'), { ssr: false });
const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Awards = dynamic(() => import('@/components/Awards-Page/Awards'), { ssr: false });
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0b0920',
        color: '#ffffff',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f0c29, #302b63, #0d1b2a, #1a0a2e)',
          backgroundSize: '400% 400%',
          animation: 'gradShift 16s ease infinite',
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

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #12102a 0%, #0e0c22 100%)',
            width: '100%',
            color: '#ffffff',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            bgcolor: '#0b0920',
            width: '100%',
            color: '#ffffff',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #0e0c22 0%, #0a0818 100%)',
            width: '100%',
            color: '#ffffff',
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
