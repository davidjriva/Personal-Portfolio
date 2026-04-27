'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './Logo';

const pages = ['About', 'Projects', 'Contact'];

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
      sx={{
        mx: 2,
        fontWeight: active ? 700 : 500,
        fontSize: '0.85rem',
        letterSpacing: '0.02em',
        color: active ? '#38c0f2' : 'rgba(240, 240, 245, 0.5)',
        position: 'relative',
        py: 0.5,
        transition: 'color 0.25s ease',
        '&:hover': { color: '#f0f0f5' },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: active ? '100%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, #38c0f2, #8b5cf6)',
          borderRadius: '1px',
          transition: 'width 0.25s ease',
        },
        '&:hover::after': { width: '100%' },
      }}
    >
      {page}
    </Typography>
  </ScrollLink>
);

const MobileDrawerContent = ({ setOpen, setActivePage }) => (
  <Box
    sx={{
      width: 280,
      height: '100%',
      background: 'rgba(10, 10, 20, 0.98)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <IconButton onClick={() => setOpen(false)} sx={{ color: 'rgba(240,240,245,0.5)' }}>
        <CloseIcon />
      </IconButton>
    </Box>
    <List sx={{ px: 2, mt: 2 }}>
      {pages.map((page) => (
        <ScrollLink
          key={page}
          to={page.toLowerCase()}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onSetActive={() => setActivePage(page)}
          onClick={() => setOpen(false)}
          style={{ textDecoration: 'none' }}
        >
          <ListItemButton
            sx={{
              borderRadius: '12px',
              mb: 1,
              '&:hover': { background: 'rgba(255,255,255,0.04)' },
            }}
          >
            <ListItemText
              primary={page}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#f0f0f5',
                fontFamily: 'var(--font-montserrat), Arial, sans-serif',
              }}
            />
          </ListItemButton>
        </ScrollLink>
      ))}
    </List>
    <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <Typography sx={{ fontSize: '0.75rem', color: 'rgba(240,240,245,0.3)' }}>
        davidriva.dev
      </Typography>
    </Box>
  </Box>
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
          bgcolor: 'rgba(10, 10, 20, 0.7)',
          backdropFilter: 'blur(20px)',
          height: '60px',
          color: '#f0f0f5',
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
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontSize: '1.15rem',
                color: '#f0f0f5',
              }}
            >
              DAVID<span style={{ color: '#38c0f2' }}>RIVA</span>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'rgba(240,240,245,0.7)',
              '&:hover': { color: '#f0f0f5' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            background: 'transparent',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.4)',
          },
        }}
      >
        <MobileDrawerContent setOpen={setMobileOpen} setActivePage={setActivePage} />
      </Drawer>
    </>
  );
};

export default NavBar;
