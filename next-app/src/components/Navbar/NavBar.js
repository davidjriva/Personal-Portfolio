'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';

const NAV_ITEMS = ['About', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    onSetActive={() => setActivePage(page)}
    style={{ cursor: 'pointer', textDecoration: 'none' }}
  >
    <Box
      sx={{
        px: 2,
        py: 0.75,
        borderRadius: '100px',
        fontSize: '0.85rem',
        fontWeight: active ? 600 : 400,
        fontFamily: 'var(--font-inter), sans-serif',
        color: active ? '#e8e6e3' : 'rgba(232, 230, 227, 0.4)',
        bgcolor: active ? 'rgba(232, 230, 227, 0.06)' : 'transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.02em',
        '&:hover': {
          color: '#e8e6e3',
          bgcolor: 'rgba(232, 230, 227, 0.04)',
        },
      }}
    >
      {page}
    </Box>
  </ScrollLink>
);

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(12, 12, 14, 0.8)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        height: '56px',
        color: '#e8e6e3',
        borderBottom: '1px solid rgba(232, 230, 227, 0.06)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4, lg: 6 },
          minHeight: '56px !important',
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #d4a053, #b8863a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: '#0c0c0e',
              mr: 1,
            }}
          >
            DR
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.95rem',
              color: '#e8e6e3',
              letterSpacing: '-0.01em',
            }}
          >
            david riva
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {NAV_ITEMS.map((page) => (
            <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
