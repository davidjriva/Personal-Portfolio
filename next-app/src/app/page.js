'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';

const About = dynamic(() => import('@/components/About/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer/Footer'), { ssr: false });

export default function MainPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', position: 'relative' }}>
      <Nav />
      <Hero />
      <Box
        id="about"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <About />
      </Box>
      <Box
        id="experience"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Experience />
      </Box>
      <Box
        id="projects"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Projects />
      </Box>
      <Box
        id="skills"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Skills />
      </Box>
      <Box
        id="contact"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
