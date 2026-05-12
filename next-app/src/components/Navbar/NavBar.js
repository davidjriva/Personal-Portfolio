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
        margin: '0 2px',
        padding: '6px 16px',
        fontWeight: active ? 500 : 400,
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        letterSpacing: '-0.01em',
        transition: 'all 0.2s ease',
        color: active ? '#fafafa' : '#71717a',
        borderRadius: '8px',
        backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
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
        backdropFilter: 'blur(20px) saturate(180%)',
        height: '60px',
        color: '#fafafa',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          minHeight: '60px !important',
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
              fontWeight: 600,
              letterSpacing: '-0.02em',
              fontSize: '1.05rem',
              color: '#fafafa',
            }}
          >
            David Riva
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5,
            p: '4px',
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
