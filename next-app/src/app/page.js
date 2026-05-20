'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const SECTION_BG = '#0a0a12';

const Section = ({ id, children, sx = {} }) => (
  <Box
    id={id}
    sx={{
      position: 'relative',
      width: '100%',
      color: '#e8e8ed',
      ...sx,
    }}
  >
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      {children}
    </Box>
  </Box>
);

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: SECTION_BG,
        color: '#e8e8ed',
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
          minHeight: 600,
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 60%),
                       radial-gradient(ellipse 60% 50% at 80% 60%, rgba(167,139,250,0.06) 0%, transparent 50%),
                       linear-gradient(180deg, #0c0c18 0%, #0a0a12 100%)`,
        }}
      >
        <ParticleBackground backgroundColor="transparent" />
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Section id="about">
          <About />
        </Section>

        <Section
          id="experience"
          sx={{
            background: `linear-gradient(180deg, ${SECTION_BG} 0%, #0c0c16 50%, ${SECTION_BG} 100%)`,
          }}
        >
          <Experience />
        </Section>

        <Section id="projects">
          <Projects />
        </Section>

        <Section
          id="skills"
          sx={{
            background: `linear-gradient(180deg, ${SECTION_BG} 0%, #0c0c16 50%, ${SECTION_BG} 100%)`,
          }}
        >
          <Skills />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
