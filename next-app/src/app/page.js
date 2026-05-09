'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/About-Page/SimpleTimeline'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });

const MainPage = () => {
  return (
    <Box sx={{ bgcolor: '#09090b', color: '#f4f4f5', position: 'relative', minHeight: '100vh' }}>
      <NavBar />

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Ambient gradient orbs */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-30%',
              left: '-15%',
              width: '55vw',
              height: '55vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%)',
              filter: 'blur(60px)',
              animation: 'orbFloat1 22s ease-in-out infinite',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-25%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 65%)',
              filter: 'blur(60px)',
              animation: 'orbFloat2 28s ease-in-out infinite',
            },
            '@keyframes orbFloat1': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '33%': { transform: 'translate(4vw, 5vh) scale(1.05)' },
              '66%': { transform: 'translate(-2vw, 2vh) scale(0.95)' },
            },
            '@keyframes orbFloat2': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(-6vw, -4vh) scale(1.08)' },
            },
          }}
        />

        {/* Subtle dot grid */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        <HeroChat />
      </Box>

      {/* Content sections */}
      <Box id="about">
        <About />
      </Box>

      <Box
        sx={{
          height: '1px',
          maxWidth: 1200,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
        }}
      />

      <Box id="experience">
        <Experience />
      </Box>

      <Box
        sx={{
          height: '1px',
          maxWidth: 1200,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
        }}
      />

      <Box id="projects">
        <Projects />
      </Box>

      <Box
        sx={{
          height: '1px',
          maxWidth: 1200,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
        }}
      />

      <Box id="skills">
        <Skills />
      </Box>

      <Box
        sx={{
          height: '1px',
          maxWidth: 1200,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
        }}
      />

      <Box id="contact">
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
