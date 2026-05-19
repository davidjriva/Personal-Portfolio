'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './Logo';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage, onClick }) => (
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
        fontSize: '0.85rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#fafafa' : 'rgba(255, 255, 255, 0.45)',
        letterSpacing: '0.02em',
        transition: 'color 0.2s ease',
        position: 'relative',
        px: 1.5,
        py: 0.5,
        '&:hover': { color: '#fafafa' },
        '&::after': active
          ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '2px',
              borderRadius: '1px',
              background: '#818cf8',
            }
          : {},
      }}
    >
      {page}
    </Typography>
  </ScrollLink>
);

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
          bgcolor: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          height: '64px',
          color: '#fafafa',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
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
                fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                color: '#fafafa',
              }}
            >
              David Riva
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {pages.map((page) => (
              <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fafafa' }}
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
            bgcolor: 'rgba(9, 9, 11, 0.95)',
            backdropFilter: 'blur(24px)',
            width: '75vw',
            maxWidth: 320,
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fafafa' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {pages.map((page) => (
            <ListItem key={page} sx={{ py: 1.5 }}>
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
