'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#050510',
        color: '#f0f0f5',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(56,192,242,0.05), transparent),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(110,64,201,0.05), transparent),
            radial-gradient(ellipse 50% 50% at 50% 80%, rgba(56,192,242,0.03), transparent),
            #050510
          `,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />
        <HeroChat />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            background: `
              radial-gradient(ellipse 70% 50% at 80% 50%, rgba(56,192,242,0.03), transparent),
              radial-gradient(ellipse 50% 50% at 20% 30%, rgba(110,64,201,0.03), transparent),
              #050510
            `,
            width: '100%',
          }}
        >
          <About />
        </Box>

        <Box
          id="experience"
          sx={{
            background: `
              radial-gradient(ellipse 60% 50% at 30% 50%, rgba(110,64,201,0.04), transparent),
              radial-gradient(ellipse 50% 40% at 70% 30%, rgba(56,192,242,0.03), transparent),
              #050510
            `,
            width: '100%',
          }}
        >
          <Experience />
        </Box>

        <Box
          id="projects"
          sx={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(56,192,242,0.03), transparent),
              #050510
            `,
            width: '100%',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(110,64,201,0.03), transparent),
              #050510
            `,
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
