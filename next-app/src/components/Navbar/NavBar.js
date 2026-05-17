'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import './ScrollLink.css';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const FormattedLink = ({ page, active, setActivePage }) => {
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-80}
      duration={500}
      onSetActive={() => setActivePage(page)}
      className="scroll-link"
      style={{
        fontWeight: active ? 600 : 500,
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '0.85rem',
        letterSpacing: '0.02em',
        color: active ? '#38c0f2' : 'rgba(255, 255, 255, 0.45)',
        padding: '6px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        background: active ? 'rgba(56, 192, 242, 0.08)' : 'transparent',
      }}
    >
      {page}
    </ScrollLink>
  );
};

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
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: scrolled ? 'rgba(5, 5, 16, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        height: '72px',
        color: '#f0f0f5',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 5 },
          height: '100%',
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
              letterSpacing: '-0.02em',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.15rem',
              color: '#f0f0f5',
            }}
          >
            DAVID<span style={{ color: '#38c0f2' }}>RIVA</span>
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
