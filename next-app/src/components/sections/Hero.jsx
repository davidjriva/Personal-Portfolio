'use client';

import { Box, Typography, IconButton, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 3,
      }}
    >
      {/* Gradient orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: { xs: 400, md: 700 },
          height: { xs: 400, md: 700 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          animation: 'heroOrb1 25s ease-in-out infinite',
          '@keyframes heroOrb1': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(-80px, 60px) scale(1.1)' },
            '66%': { transform: 'translate(40px, -30px) scale(0.95)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: { xs: 350, md: 600 },
          height: { xs: 350, md: 600 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          animation: 'heroOrb2 30s ease-in-out infinite',
          '@keyframes heroOrb2': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(60px, -40px) scale(1.05)' },
          },
        }}
      />

      {/* Noise texture overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            mb: 3,
            display: 'block',
            fontSize: { xs: '0.7rem', md: '0.8rem' },
          }}
        >
          SOFTWARE ENGINEER
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3.2rem', sm: '4.5rem', md: '6rem', lg: '7rem' },
            mb: 3,
            background: 'linear-gradient(160deg, #fafafa 30%, rgba(161,161,170,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          David Riva
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.2rem' },
            maxWidth: 580,
            mx: 'auto',
            mb: 5,
            lineHeight: 1.7,
          }}
        >
          Building intelligent applications at the intersection of AI and full-stack engineering.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" mb={5}>
          <Button
            variant="contained"
            onClick={() => scrollTo('projects')}
            sx={{
              px: 4,
              py: 1.4,
              fontSize: '0.95rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                boxShadow: '0 4px 32px rgba(99,102,241,0.35)',
              },
            }}
          >
            View Projects
          </Button>
          <Button
            variant="outlined"
            onClick={() => scrollTo('about')}
            sx={{
              px: 4,
              py: 1.4,
              fontSize: '0.95rem',
              fontWeight: 600,
              borderColor: 'rgba(255,255,255,0.12)',
              color: '#fafafa',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.25)',
                bgcolor: 'rgba(255,255,255,0.04)',
              },
            }}
          >
            About Me
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="center">
          <IconButton
            component="a"
            href="https://github.com/davidjriva"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            sx={{
              color: 'text.secondary',
              transition: 'color 0.2s, transform 0.2s',
              '&:hover': { color: '#fafafa', transform: 'translateY(-2px)' },
            }}
          >
            <GitHubIcon fontSize="medium" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/david-j-riva"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            sx={{
              color: 'text.secondary',
              transition: 'color 0.2s, transform 0.2s',
              '&:hover': { color: '#fafafa', transform: 'translateY(-2px)' },
            }}
          >
            <LinkedInIcon fontSize="medium" />
          </IconButton>
        </Stack>
      </Box>

      {/* Scroll indicator */}
      <Box
        component="button"
        onClick={() => scrollTo('about')}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          animation: 'scrollPulse 2.5s ease-in-out infinite',
          '@keyframes scrollPulse': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)', opacity: 0.3 },
            '50%': { transform: 'translateX(-50%) translateY(10px)', opacity: 0.7 },
          },
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: 'text.secondary', fontSize: 32 }} />
      </Box>
    </Box>
  );
};

export default Hero;
