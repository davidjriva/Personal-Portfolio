'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

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
    <Box
      sx={{
        position: 'relative',
        px: 2,
        py: 0.75,
        borderRadius: '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: active ? 'rgba(96, 165, 250, 0.08)' : 'transparent',
        '&:hover': {
          bgcolor: active ? 'rgba(96, 165, 250, 0.12)' : 'rgba(255, 255, 255, 0.04)',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.82rem',
          fontWeight: active ? 600 : 400,
          color: active ? '#60a5fa' : '#6b6b80',
          transition: 'color 0.3s ease',
          letterSpacing: '0.02em',
          '&:hover': { color: active ? '#60a5fa' : '#a0a0b0' },
        }}
      >
        {page}
      </Typography>
    </Box>
  </ScrollLink>
);

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(6, 6, 10, 0.6)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        height: '60px',
        color: '#e8e8ed',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 5 },
          minHeight: '60px !important',
          height: '60px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1.5,
            '&:hover': { opacity: 0.8 },
            transition: 'opacity 0.2s ease',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.05rem',
              color: '#e8e8ed',
            }}
          >
            david
            <Box component="span" sx={{ color: '#60a5fa' }}>
              riva
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            p: 0.5,
          }}
        >
          {pages.map((page) => (
            <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Box
            component="a"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 2.5,
              py: 0.75,
              borderRadius: '8px',
              border: '1px solid rgba(96, 165, 250, 0.25)',
              bgcolor: 'rgba(96, 165, 250, 0.06)',
              color: '#60a5fa',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(96, 165, 250, 0.12)',
                borderColor: 'rgba(96, 165, 250, 0.4)',
              },
            }}
          >
            Resume
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
