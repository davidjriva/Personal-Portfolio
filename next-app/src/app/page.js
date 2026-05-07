'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#06060a',
        color: '#e8e8ed',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(96,165,250,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%, rgba(167,139,250,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(96,165,250,0.04) 0%, transparent 50%)',
            animation: 'meshDrift 20s ease-in-out infinite',
            '@keyframes meshDrift': {
              '0%, 100%': {
                background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(96,165,250,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%, rgba(167,139,250,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(96,165,250,0.04) 0%, transparent 50%)',
              },
              '33%': {
                background: 'radial-gradient(ellipse 70% 50% at 60% 50%, rgba(167,139,250,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 30% 40%, rgba(96,165,250,0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 70%, rgba(167,139,250,0.04) 0%, transparent 50%)',
              },
              '66%': {
                background: 'radial-gradient(ellipse 60% 70% at 40% 30%, rgba(96,165,250,0.07) 0%, transparent 60%), radial-gradient(ellipse 70% 40% at 70% 60%, rgba(167,139,250,0.05) 0%, transparent 50%), radial-gradient(ellipse 40% 50% at 30% 50%, rgba(96,165,250,0.05) 0%, transparent 50%)',
              },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <HeroChat />
      </Box>

      <Box id="about" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.2), rgba(167,139,250,0.2), transparent)',
          }}
        />
        <About />
      </Box>

      <Box id="experience" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }}
        />
        <Experience />
      </Box>

      <Box id="projects" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.2), rgba(167,139,250,0.2), transparent)',
          }}
        />
        <Projects />
      </Box>

      <Box id="contact" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }}
        />
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
