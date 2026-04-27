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
        bgcolor: '#0a0a14',
        color: '#f0f0f5',
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
          background: 'linear-gradient(135deg, #0c0a20, #1a1040, #0c1525, #150a28)',
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

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* About — Bento grid */}
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #0c0a1e 0%, #0a0a14 100%)',
            width: '100%',
          }}
        >
          <About />
        </Box>

        {/* Divider */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            px: 4,
          }}
        >
          <Box
            sx={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
          />
        </Box>

        {/* Projects */}
        <Box
          id="projects"
          sx={{
            bgcolor: '#0a0a14',
            width: '100%',
          }}
        >
          <Projects />
        </Box>

        {/* Divider */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            px: 4,
          }}
        >
          <Box
            sx={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
          />
        </Box>

        {/* Contact */}
        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #0a0a14 0%, #080810 100%)',
            width: '100%',
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
