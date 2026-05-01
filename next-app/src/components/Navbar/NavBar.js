'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Contact'];

const NavBar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((id) => document.getElementById(id.toLowerCase()));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(NAV_ITEMS[i]);
          return;
        }
      }
      setActive('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id.toLowerCase());
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2.5, md: 4 },
        height: '64px',
        bgcolor: scrolled ? 'rgba(9, 9, 11, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <Box
        onClick={() => scrollTo(null)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.85rem',
            color: '#09090b',
          }}
        >
          DR
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
            color: '#fafafa',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          David Riva
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1 },
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '999px',
          px: 1,
          py: 0.5,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Box
            key={item}
            component="button"
            onClick={() => scrollTo(item)}
            sx={{
              background: active === item ? 'rgba(167, 139, 250, 0.15)' : 'transparent',
              border: 'none',
              borderRadius: '999px',
              px: { xs: 1.5, sm: 2 },
              py: 0.75,
              color: active === item ? '#a78bfa' : 'rgba(255,255,255,0.5)',
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              '&:hover': {
                color: '#fafafa',
                background: 'rgba(255,255,255,0.06)',
              },
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NavBar;
