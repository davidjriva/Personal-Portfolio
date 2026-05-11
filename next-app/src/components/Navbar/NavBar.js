'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './ScrollLink.css';

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: 1100,
          width: '100%',
          bgcolor: 'rgba(7, 7, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          height: '64px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: '64px !important' }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.8rem',
                color: '#fff',
                fontFamily: 'var(--font-montserrat), sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              DR
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: '1.1rem',
                color: '#f5f5f7',
                display: { xs: 'none', sm: 'block' },
                letterSpacing: '-0.01em',
              }}
            >
              David Riva
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {pages.map((page) => (
              <ScrollLink
                key={page}
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => setActivePage(page)}
                className="scroll-link"
                style={{
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-inter), var(--font-montserrat), sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: activePage === page ? '#f5f5f7' : 'rgba(255,255,255,0.5)',
                  background: activePage === page ? 'rgba(255,255,255,0.06)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                {page}
              </ScrollLink>
            ))}
          </Box>

          <IconButton sx={{ display: { md: 'none' }, color: '#f5f5f7' }} onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0f',
            width: 280,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#f5f5f7' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2, pt: 2 }}>
          {pages.map((page) => (
            <ListItem key={page} disablePadding sx={{ mb: 0.5 }}>
              <ScrollLink
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setMobileOpen(false)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  color: '#f5f5f7',
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {page}
              </ScrollLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
