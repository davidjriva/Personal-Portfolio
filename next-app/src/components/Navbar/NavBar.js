'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const NAV_LINKS = ['About', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-80}
    duration={600}
    onSetActive={() => setActivePage(page)}
    style={{ textDecoration: 'none', cursor: 'pointer' }}
  >
    <Typography
      component="span"
      sx={{
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#fafafa' : '#71717a',
        px: 2,
        py: 0.75,
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#fafafa',
          backgroundColor: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      {page}
    </Typography>
  </ScrollLink>
);

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');
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
        width: { xs: 'calc(100% - 32px)', md: 'auto' },
        maxWidth: 560,
        borderRadius: '16px',
        bgcolor: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(9,9,11,0.6)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '52px !important',
          px: { xs: 2, md: 2.5 },
          gap: 2,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
              color: '#fafafa',
            }}
          >
            D<span style={{ color: '#38bdf8' }}>R</span>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {NAV_LINKS.map((page) => (
            <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
