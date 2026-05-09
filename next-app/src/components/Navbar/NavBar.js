'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: `translateX(-50%) translateY(${scrolled ? 0 : -80}px)`,
        zIndex: 1100,
        opacity: scrolled ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.5,
        borderRadius: '999px',
        bgcolor: 'rgba(9, 9, 11, 0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          px: 2,
          py: 1,
          cursor: 'pointer',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          mr: 0.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '0.85rem',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-montserrat), sans-serif',
            color: '#f4f4f5',
          }}
        >
          DR
        </Typography>
      </Box>

      {pages.map((page) => (
        <ScrollLink
          key={page}
          to={page.toLowerCase()}
          spy={true}
          smooth={true}
          offset={-80}
          duration={600}
          onSetActive={() => setActivePage(page)}
        >
          <Box
            sx={{
              px: { xs: 1.5, sm: 2.5 },
              py: 1,
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: { xs: '0.78rem', sm: '0.85rem' },
              fontWeight: 500,
              fontFamily: 'var(--font-montserrat), sans-serif',
              color: activePage === page ? '#f4f4f5' : '#6b7280',
              bgcolor: activePage === page ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: '#f4f4f5',
                bgcolor: activePage === page ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.04)',
              },
            }}
          >
            {page}
          </Box>
        </ScrollLink>
      ))}
    </Box>
  );
};

export default NavBar;
