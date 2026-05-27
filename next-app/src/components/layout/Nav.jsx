'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Stack } from '@mui/material';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    const scrollPos = window.scrollY + 120;

    let current = '';
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        px: { xs: 2, md: 4 },
        py: 1.5,
        transition: 'all 0.3s ease',
        bgcolor: scrolled ? 'rgba(9,9,11,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Box
          component="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 0,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', lineHeight: 1 }}>DR</Typography>
          </Box>
          <Typography
            sx={{
              color: '#fafafa',
              fontWeight: 700,
              fontSize: '1rem',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            David Riva
          </Typography>
        </Box>

        {/* Nav links */}
        <Stack direction="row" spacing={{ xs: 0.5, sm: 1, md: 2 }} alignItems="center">
          {NAV_LINKS.map((link) => (
            <Box
              key={link.id}
              component="button"
              onClick={() => scrollTo(link.id)}
              sx={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                px: { xs: 1, sm: 1.5 },
                py: 1,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: activeSection === link.id ? 16 : 0,
                  height: 2,
                  borderRadius: 1,
                  bgcolor: 'primary.main',
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              <Typography
                sx={{
                  color: activeSection === link.id ? '#fafafa' : 'text.secondary',
                  fontSize: { xs: '0.75rem', sm: '0.82rem' },
                  fontWeight: activeSection === link.id ? 600 : 400,
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Nav;
