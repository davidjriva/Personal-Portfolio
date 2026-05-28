'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';

const NAV_ITEMS = ['About', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    onSetActive={() => setActivePage(page)}
    style={{ textDecoration: 'none', cursor: 'pointer' }}
  >
    <Typography
      component="span"
      sx={{
        mx: 2,
        fontWeight: active ? 600 : 400,
        fontSize: '0.85rem',
        color: active ? '#fafafa' : 'rgba(255, 255, 255, 0.4)',
        transition: 'color 0.2s ease',
        position: 'relative',
        py: 0.5,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: active ? '100%' : '0%',
          height: '1.5px',
          background: '#38c0f2',
          borderRadius: '1px',
          transition: 'width 0.25s ease',
        },
        '&:hover': {
          color: '#fafafa',
          '&::after': {
            width: '100%',
          },
        },
      }}
    >
      {page}
    </Typography>
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
        bgcolor: 'rgba(5, 5, 7, 0.6)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        height: '60px',
        color: '#fafafa',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: 'none',
        transition: 'background-color 0.3s ease',
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
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              fontSize: '1.15rem',
              color: '#fafafa',
            }}
          >
            DAVID
            <Box component="span" sx={{ color: '#38c0f2' }}>
              RIVA
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {NAV_ITEMS.map((page) => (
            <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
