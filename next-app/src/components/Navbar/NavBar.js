'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(10, 10, 11, 0.8)',
        backdropFilter: 'blur(20px)',
        height: '64px',
        color: '#f0ede8',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 6 }, height: '100%' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              color: '#f0ede8',
            }}
          >
            david
            <Box component="span" sx={{ color: '#e8a838' }}>riva</Box>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {pages.map((page) => (
            <ScrollLink
              key={page}
              to={page.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={600}
              onSetActive={() => setActivePage(page)}
            >
              <Box
                component="button"
                sx={{
                  background: 'none',
                  border: 'none',
                  color: activePage === page ? '#f0ede8' : 'rgba(240, 237, 232, 0.4)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  px: 2,
                  py: 1,
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#f0ede8',
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                {page}
              </Box>
            </ScrollLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
