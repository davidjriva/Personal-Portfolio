'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const pages = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        height: '64px',
        color: '#e8e6e3',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 5 },
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.1rem',
              color: '#e8e6e3',
            }}
          >
            david<span style={{ color: '#6eb6f0' }}>riva</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            px: 1,
            py: 0.5,
          }}
        >
          {pages.map((page) => {
            const isActive = activePage === page;
            return (
              <ScrollLink
                key={page}
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => setActivePage(page)}
                style={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: '100px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.45)',
                    bgcolor: isActive ? 'rgba(110, 182, 240, 0.12)' : 'transparent',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      color: '#fff',
                      bgcolor: isActive ? 'rgba(110, 182, 240, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                    },
                  }}
                >
                  {page}
                </Box>
              </ScrollLink>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
