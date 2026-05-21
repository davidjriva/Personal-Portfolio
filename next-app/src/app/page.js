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

const noiseOverlay = {
  '&::before': {
    content: '""',
    position: 'fixed',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '256px 256px',
    pointerEvents: 'none',
    zIndex: 0,
  },
};

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#06060b',
        color: '#e8e6e3',
        position: 'relative',
        minHeight: '100vh',
        ...noiseOverlay,
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(167,139,250,0.08) 0%, transparent 60%), #06060b',
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Box
          id="about"
          sx={{
            background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(167,139,250,0.04) 0%, transparent 60%), #06060b',
            width: '100%',
          }}
        >
          <About />
        </Box>

        <Box
          id="experience"
          sx={{
            background: 'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(56,189,248,0.03) 0%, transparent 60%), #06060b',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <Experience />
        </Box>

        <Box
          id="projects"
          sx={{
            background: '#06060b',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(167,139,250,0.04) 0%, transparent 60%), #06060b',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.04)',
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
