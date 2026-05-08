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
        bgcolor: '#09090B',
        color: '#F4F4F5',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 70% 60%, rgba(192, 132, 252, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #09090B 0%, #0E0E14 50%, #09090B 100%)',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            bgcolor: '#09090B',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #09090B 0%, #0E0E14 100%)',
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
