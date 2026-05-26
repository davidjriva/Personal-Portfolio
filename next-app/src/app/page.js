'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import NavBar from '@/components/Navbar/NavBar';
import Hero from '@/components/Hero/Hero';

const About = dynamic(() => import('@/components/About/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills/Skills'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact/Contact'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget/ChatWidget'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer/Footer'), { ssr: false });

const SectionDivider = () => (
  <Box
    sx={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.12), transparent)',
      mx: 'auto',
      maxWidth: 400,
    }}
  />
);

const MainPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <NavBar />
      <Hero />

      <Box component="main">
        <Box id="about">
          <About />
        </Box>
        <SectionDivider />
        <Box id="experience">
          <Experience />
        </Box>
        <SectionDivider />
        <Box id="projects">
          <Projects />
        </Box>
        <SectionDivider />
        <Box id="skills">
          <Skills />
        </Box>
        <SectionDivider />
        <Box id="contact">
          <Contact />
        </Box>
      </Box>

      <Footer />
      <ChatWidget />
    </Box>
  );
};

export default MainPage;
