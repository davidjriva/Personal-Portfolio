'use client';

import { Box, Typography, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0a0a0b',
        color: '#f0ede6',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          // Subtle radial gradient spots
          background: `
            radial-gradient(ellipse 600px 600px at 20% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 500px 500px at 80% 30%, rgba(239, 68, 68, 0.03) 0%, transparent 70%),
            #0a0a0b
          `,
          // Grain overlay via pseudo-element
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            opacity: 0.4,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            px: 3,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              mb: 2,
              color: '#f0ede6',
            }}
          >
            David Riva
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(240, 237, 230, 0.6)',
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              letterSpacing: '0.02em',
              mb: 4,
            }}
          >
            Software Engineer — AI & Full-Stack
          </Typography>
          <Button
            component={Link}
            href="/chat"
            sx={{
              color: '#f0ede6',
              border: '1px solid rgba(240, 237, 230, 0.15)',
              borderRadius: '50px',
              px: 4,
              py: 1.25,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(245, 158, 11, 0.5)',
                bgcolor: 'rgba(245, 158, 11, 0.05)',
              },
            }}
          >
            Chat with my AI assistant
          </Button>
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            zIndex: 2,
            opacity: 0.5,
            animation: 'scrollBounce 2s ease-in-out infinite',
            '@keyframes scrollBounce': {
              '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
              '50%': { transform: 'translateX(-50%) translateY(8px)' },
            },
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(240, 237, 230, 0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll
          </Typography>
          <Box
            sx={{
              width: 1,
              height: 24,
              bgcolor: 'rgba(240, 237, 230, 0.2)',
            }}
          />
        </Box>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          width: '100%',
          background: `
            radial-gradient(ellipse 800px 400px at 70% 0%, rgba(245, 158, 11, 0.02) 0%, transparent 70%),
            #0a0a0b
          `,
        }}
      >
        <About />
      </Box>

      {/* Projects Section */}
      <Box
        id="projects"
        sx={{
          width: '100%',
          background: `
            radial-gradient(ellipse 600px 600px at 30% 50%, rgba(239, 68, 68, 0.02) 0%, transparent 70%),
            #0a0a0b
          `,
        }}
      >
        <Projects />
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          width: '100%',
          background: `
            radial-gradient(ellipse 700px 500px at 60% 50%, rgba(245, 158, 11, 0.02) 0%, transparent 70%),
            #0a0a0b
          `,
        }}
      >
        <Contact />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainPage;
