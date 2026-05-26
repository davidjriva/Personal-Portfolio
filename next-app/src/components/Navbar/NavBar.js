'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const pages = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-80}
    duration={500}
    onSetActive={() => setActivePage(page)}
    style={{ cursor: 'pointer' }}
  >
    <Typography
      sx={{
        fontSize: '0.85rem',
        fontWeight: active ? 600 : 400,
        color: active ? 'text.primary' : 'text.secondary',
        px: 1.5,
        py: 0.5,
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        '&:hover': { color: 'text.primary', bgcolor: 'rgba(255,255,255,0.04)' },
      }}
    >
      {page}
    </Typography>
  </ScrollLink>
);

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: 1100,
          bgcolor: scrolled ? 'rgba(6, 6, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            height: 64,
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                letterSpacing: '-0.5px',
              }}
            >
              david
              <Box component="span" sx={{ color: 'primary.main' }}>
                riva
              </Box>
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {pages.map((page) => (
              <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0c0c12',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pb: 3 }}>
          {pages.map((page) => (
            <ListItem key={page} sx={{ justifyContent: 'center' }}>
              <ScrollLink
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setMobileOpen(false)}
                style={{ cursor: 'pointer' }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: activePage === page ? 'text.primary' : 'text.secondary',
                    py: 1,
                  }}
                >
                  {page}
                </Typography>
              </ScrollLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
