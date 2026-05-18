'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import './ScrollLink.css';

const linkStyles = {
  margin: '0 20px',
  fontWeight: 500,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
  transition: 'color 0.2s ease',
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

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
        ...linkStyles,
        color: active ? '#818cf8' : 'rgba(255, 255, 255, 0.4)',
        fontWeight: active ? 600 : 500,
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
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.1rem',
              color: '#fafafa',
            }}
          >
            david<span style={{ color: '#818cf8' }}>riva</span>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
