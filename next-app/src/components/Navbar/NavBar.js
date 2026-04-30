'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-80}
    duration={500}
    onSetActive={() => setActivePage(page)}
    style={{ textDecoration: 'none', cursor: 'pointer' }}
  >
    <Typography
      component="span"
      sx={{
        px: 2,
        py: 0.75,
        fontSize: '0.82rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#fafafa' : '#a1a1aa',
        borderRadius: '8px',
        backgroundColor: active ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#fafafa',
          backgroundColor: 'rgba(255,255,255,0.04)',
        },
      }}
    >
      {page}
    </Typography>
  </ScrollLink>
);

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
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        maxWidth: '600px',
        borderRadius: '16px',
        bgcolor: scrolled ? 'rgba(9, 9, 11, 0.85)' : 'rgba(9, 9, 11, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          minHeight: '48px !important',
          px: 2,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '-0.02em',
              color: '#fafafa',
            }}
          >
            DR
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {pages.map((page) => (
            <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
