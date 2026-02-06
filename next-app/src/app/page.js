'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/next';

import dynamic from 'next/dynamic';

const Greeting = dynamic(() => import('@/components/Greeting-Page/Greeting'), { ssr: false });
const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Awards = dynamic(() => import('@/components/Awards-Page/Awards'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';


const MainPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        minHeight: '100vh',
      }}
    > 
      {/* Enables Vercel deployment analytics */}
      <Analytics />

      <Box 
        sx={{ 
          position: 'relative', 
          height: '100vh',
          bgcolor: theme.palette.mode === 'dark' ? 'transparent' : '#e9ecef'
        }}
      >
        <ParticleBackground 
          backgroundColor={theme.palette.mode === 'dark' ? '#282829' : '#e9ecef'} 
        />
        <Greeting />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />

        <Box 
          id="about"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#262624' : '#f8f9fa', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderBottom: (theme) => `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`
          }}
        >
          <About />
        </Box>

        <Box 
          id="projects"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1F1E1D' : '#f1f3f5', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderBottom: (theme) => `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`
          }}
        >
          <Projects />
        </Box>

        <Box 
          id="contact"
          sx={{ 
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#141413' : '#e9ecef', 
            width: '100%',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary'
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
