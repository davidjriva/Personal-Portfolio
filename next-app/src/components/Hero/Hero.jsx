'use client';

import { Box, Typography, Button, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect, useCallback } from 'react';

const roles = ['Forward Deployed Engineer', 'Applied AI Engineer', 'Full-Stack Developer'];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullText = roles[roleIndex];
    if (!isDeleting) {
      setDisplayed(fullText.slice(0, displayed.length + 1));
      if (displayed.length + 1 === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      setDisplayed(fullText.slice(0, displayed.length - 1));
      if (displayed.length - 1 === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayed, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80 + Math.random() * 40;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 3,
      }}
    >
      {/* Gradient mesh background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 60% 80%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)
          `,
          animation: 'meshShift 20s ease-in-out infinite',
          '@keyframes meshShift': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.6 },
          },
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 800 }}>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: 'text.secondary',
            letterSpacing: 3,
            textTransform: 'uppercase',
            mb: 3,
            fontWeight: 500,
          }}
        >
          Software Engineer
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem', lg: '6.5rem' },
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ededf0 0%, #7a7a8e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2,
          }}
        >
          David Riva
        </Typography>

        <Box sx={{ minHeight: { xs: '2rem', md: '2.5rem' }, mb: 4 }}>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              color: 'primary.main',
              fontWeight: 500,
              fontFamily: 'var(--font-space-grotesk), sans-serif',
            }}
          >
            {displayed}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                bgcolor: 'primary.main',
                ml: 0.5,
                verticalAlign: 'text-bottom',
                animation: 'cursorBlink 1s step-end infinite',
                '@keyframes cursorBlink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 },
                },
              }}
            />
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => scrollTo('projects')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              px: 4,
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '12px',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outlined"
            onClick={() => scrollTo('contact')}
            sx={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'text.primary',
              px: 4,
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '12px',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.3)',
                bgcolor: 'rgba(255,255,255,0.04)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Get in Touch
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="center">
          {[
            { icon: <GitHubIcon />, href: 'https://github.com/davidjriva', label: 'GitHub' },
            { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/davidjriva', label: 'LinkedIn' },
            { icon: <EmailIcon />, href: 'mailto:davidjriva@gmail.com', label: 'Email' },
          ].map((s) => (
            <IconButton
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(255,255,255,0.08)',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {s.icon}
            </IconButton>
          ))}
        </Stack>
      </Box>

      {/* Scroll indicator */}
      <Box
        onClick={() => scrollTo('about')}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'text.secondary',
          animation: 'floatDown 2s ease-in-out infinite',
          '@keyframes floatDown': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
          '&:hover': { color: 'text.primary' },
          transition: 'color 0.2s ease',
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 0.5 }}>
          Scroll
        </Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  );
};

export default Hero;
