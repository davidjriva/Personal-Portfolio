'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import './ScrollLink.css';

const FormattedLink = ({ page, active, setActivePage }) => {
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      onSetActive={() => setActivePage(page)}
      className="scroll-link"
      style={{
        margin: '0 4px',
        fontWeight: active ? 600 : 400,
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
        color: active ? '#F4F4F5' : '#71717A',
        padding: '6px 14px',
        borderRadius: '8px',
        transition: 'all 0.25s ease',
        backgroundColor: active ? 'rgba(129, 140, 248, 0.08)' : 'transparent',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(9, 9, 11, 0.8)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        height: '64px',
        color: '#F4F4F5',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          maxWidth: '1400px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.1rem',
              color: '#F4F4F5',
            }}
          >
            david
            <Box component="span" sx={{ color: '#818CF8' }}>
              riva
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
