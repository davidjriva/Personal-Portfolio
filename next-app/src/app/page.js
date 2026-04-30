'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience-Page/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Awards = dynamic(() => import('@/components/Awards-Page/Awards'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });

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

      {/* Hero section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      >
        {/* Dot grid background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          }}
        />
        <HeroChat />
      </Box>

      {/* Content sections */}
      <Box id="about">
        <About />
      </Box>

      <Box
        id="experience"
        sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Experience />
      </Box>

      <Box
        id="projects"
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          position: 'relative',
        }}
      >
        <Projects />
      </Box>

      <Box
        id="skills"
        sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Skills />
      </Box>

      <Box
        id="awards"
        sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Awards />
      </Box>

      <Box
        id="contact"
        sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
