'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
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

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          overflow: 'hidden',
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            },
          }}
        >
          <About />
        </Box>

        <Box
          id="experience"
          sx={{
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            },
          }}
        >
          <Experience />
        </Box>

        <Box
          id="projects"
          sx={{
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            },
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            position: 'relative',
            width: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            },
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
