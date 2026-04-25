'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
import HeroChat from '@/components/Greeting-Page/HeroChat';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

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

      {/* Hero section with animated gradient mesh */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56,189,248,0.12), transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(167,139,250,0.08), transparent),
              radial-gradient(ellipse 50% 50% at 20% 80%, rgba(56,189,248,0.06), transparent)
            `,
            animation: 'meshShift 20s ease infinite',
            '@keyframes meshShift': {
              '0%, 100%': {
                background: `
                  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56,189,248,0.12), transparent),
                  radial-gradient(ellipse 60% 40% at 80% 60%, rgba(167,139,250,0.08), transparent),
                  radial-gradient(ellipse 50% 50% at 20% 80%, rgba(56,189,248,0.06), transparent)
                `,
              },
              '33%': {
                background: `
                  radial-gradient(ellipse 70% 60% at 30% -10%, rgba(167,139,250,0.1), transparent),
                  radial-gradient(ellipse 50% 50% at 70% 70%, rgba(56,189,248,0.1), transparent),
                  radial-gradient(ellipse 60% 40% at 50% 50%, rgba(167,139,250,0.05), transparent)
                `,
              },
              '66%': {
                background: `
                  radial-gradient(ellipse 60% 50% at 70% -15%, rgba(56,189,248,0.1), transparent),
                  radial-gradient(ellipse 70% 45% at 20% 50%, rgba(167,139,250,0.08), transparent),
                  radial-gradient(ellipse 50% 60% at 60% 90%, rgba(56,189,248,0.06), transparent)
                `,
              },
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, #09090b 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <HeroChat />
      </Box>

      {/* Content sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
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
