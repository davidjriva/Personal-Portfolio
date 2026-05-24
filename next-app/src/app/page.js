'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import HeroChat from '@/components/Greeting-Page/HeroChat';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });

const MainPage = () => {
  return (
    <Box sx={{ bgcolor: '#09090b', color: '#fafafa', position: 'relative', minHeight: '100vh' }}>
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), #09090b',
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      <Box id="about" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
          }}
        />
        <About />
      </Box>

      <Box id="experience" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
          }}
        />
        <Experience />
      </Box>

      <Box id="projects" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
          }}
        />
        <Projects />
      </Box>

      <Box id="skills" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
          }}
        />
        <Skills />
      </Box>

      <Box id="contact" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
          }}
        />
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
