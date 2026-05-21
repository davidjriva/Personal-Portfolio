'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './Logo';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage, onClick }) => {
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-80}
      duration={600}
      onSetActive={() => setActivePage(page)}
      onClick={onClick}
      style={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <Typography
        sx={{
          fontSize: '0.82rem',
          fontWeight: active ? 600 : 400,
          color: active ? '#a78bfa' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'color 0.2s ease',
          position: 'relative',
          py: 0.5,
          '&:hover': { color: '#e8e6e3' },
          '&::after': active
            ? {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1.5px',
                background: '#a78bfa',
                borderRadius: '1px',
              }
            : {},
        }}
      >
        {page}
      </Typography>
    </ScrollLink>
  );
};

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: 1100,
          width: '100%',
          bgcolor: 'rgba(6,6,11,0.6)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          height: '60px',
          color: '#e8e6e3',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
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
            maxWidth: '1400px',
            width: '100%',
            mx: 'auto',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo />
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontSize: '1.1rem',
                color: '#e8e6e3',
              }}
            >
              david
              <Box component="span" sx={{ color: '#a78bfa' }}>
                riva
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            {pages.map((page) => (
              <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#e8e6e3' }}
            onClick={() => setMobileOpen(true)}
          >
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
            bgcolor: 'rgba(6,6,11,0.95)',
            backdropFilter: 'blur(24px)',
            width: 280,
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#e8e6e3' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {pages.map((page) => (
            <ListItem key={page} sx={{ px: 4, py: 1.5 }}>
              <NavLink
                page={page}
                active={activePage === page}
                setActivePage={setActivePage}
                onClick={() => setMobileOpen(false)}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
