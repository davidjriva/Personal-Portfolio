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
        bgcolor: '#09090b',
        color: '#fafafa',
        position: 'relative',
        minHeight: '100vh',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(129, 140, 248, 0.08) 0%, #09090b 70%)',
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #09090b 0%, #0c0c10 50%, #09090b 100%)',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            bgcolor: '#09090b',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #09090b 0%, #0c0c10 100%)',
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
