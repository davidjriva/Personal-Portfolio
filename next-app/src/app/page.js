'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import NavBar from '@/components/Navbar/NavBar';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact/Contact'), { ssr: false });

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#09090b',
        color: '#fafafa',
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <NavBar />

      <Hero />

      <Box id="about">
        <About />
      </Box>

      <Box id="experience">
        <Experience />
      </Box>

      <Box id="projects">
        <Projects />
      </Box>

      <Box id="contact">
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
