'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Nav from '@/components/layout/Nav';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/layout/Footer';

const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Awards = dynamic(() => import('@/components/sections/Awards'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const ChatDrawer = dynamic(() => import('@/components/chat/ChatDrawer'), { ssr: false });

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#09090b',
        color: '#fafafa',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Nav />
      <Hero />

      <Box
        sx={{
          position: 'relative',
          '& > *:not(:last-child)': {
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          },
        }}
      >
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </Box>

      <Footer />
      <ChatDrawer />
    </Box>
  );
};

export default MainPage;
