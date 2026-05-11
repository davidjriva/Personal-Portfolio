'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const GradientOrbs = () => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '55vw',
        height: '55vw',
        maxWidth: 650,
        maxHeight: 650,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'orbFloat1 25s ease-in-out infinite',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        maxWidth: 550,
        maxHeight: 550,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'orbFloat2 30s ease-in-out infinite',
      },
      '@keyframes orbFloat1': {
        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
        '33%': { transform: 'translate(50px, 30px) scale(1.05)' },
        '66%': { transform: 'translate(-30px, -20px) scale(0.95)' },
      },
      '@keyframes orbFloat2': {
        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
        '33%': { transform: 'translate(-40px, -30px) scale(1.03)' },
        '66%': { transform: 'translate(30px, 20px) scale(0.97)' },
      },
    }}
  />
);

const MainPage = () => {
  return (
    <Box sx={{ bgcolor: '#07070a', color: '#f5f5f7', position: 'relative', minHeight: '100vh' }}>
      <NavBar />

      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <GradientOrbs />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            width: '30vw',
            height: '30vw',
            maxWidth: 400,
            maxHeight: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            animation: 'orbFloat3 35s ease-in-out infinite',
            '@keyframes orbFloat3': {
              '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
              '50%': { transform: 'translate(-45%, -55%) scale(1.1)' },
            },
          }}
        />
        <HeroChat />
      </Box>

      <Box id="about" sx={{ position: 'relative', width: '100%' }}>
        <About />
      </Box>

      <Box id="projects" sx={{ position: 'relative', width: '100%', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Projects />
      </Box>

      <Box id="contact" sx={{ position: 'relative', width: '100%', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
