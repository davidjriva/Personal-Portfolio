'use client';

import { Box, Typography, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as ScrollLink } from 'react-scroll';

const roles = ['Forward Deployed Engineer', 'Applied AI Engineer', 'Full-Stack Developer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 })
      .fromTo('.hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3')
      .fromTo('.hero-role', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.1');
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayText === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === '') {
      const next = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 50);
      return () => clearTimeout(next);
    }

    const speed = isDeleting ? 35 : 70;
    const timeout = setTimeout(() => {
      setDisplayText(currentRole.slice(0, displayText.length + (isDeleting ? -1 : 1)));
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        px: { xs: 3, md: 6 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '300px', md: '600px' },
          height: { xs: '250px', md: '400px' },
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: { xs: '200px', md: '350px' },
          height: { xs: '200px', md: '350px' },
          background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Typography
        className="hero-label"
        sx={{
          fontFamily: 'var(--font-mono)',
          fontSize: { xs: '0.8rem', md: '0.9rem' },
          color: 'primary.main',
          mb: 2.5,
          opacity: 0,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Hello, I&apos;m
      </Typography>

      <Typography
        className="hero-name"
        variant="h1"
        sx={{
          fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem', lg: '7rem' },
          fontWeight: 800,
          opacity: 0,
          background: 'linear-gradient(135deg, #fafafa 0%, #71717a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2.5,
          lineHeight: 1,
        }}
      >
        David Riva
      </Typography>

      <Box
        className="hero-role"
        sx={{
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '2.5rem',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: { xs: '0.95rem', md: '1.2rem' },
            color: 'text.secondary',
          }}
        >
          {displayText}
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

      <Box
        className="hero-scroll"
        sx={{
          position: 'absolute',
          bottom: { xs: 30, md: 48 },
          opacity: 0,
          animation: 'heroFloat 2.5s ease-in-out infinite',
          '@keyframes heroFloat': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
          },
        }}
      >
        <ScrollLink to="about" smooth duration={800} offset={-80}>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </ScrollLink>
      </Box>
    </Box>
  );
}
