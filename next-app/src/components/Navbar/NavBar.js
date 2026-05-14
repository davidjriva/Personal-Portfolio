'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './Logo';
import './ScrollLink.css';

const pages = ['About', 'Experience', 'Projects', 'Contact'];

const NavLink = ({ page, active, setActivePage }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    onSetActive={() => setActivePage(page)}
    className="scroll-link"
    style={{
      margin: '0 20px',
      fontWeight: 500,
      fontSize: '0.8rem',
      textDecoration: 'none',
      cursor: 'pointer',
      fontFamily: 'Montserrat, Arial, sans-serif',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      transition: 'color 0.3s ease',
      color: active ? '#38c0f2' : 'rgba(255, 255, 255, 0.4)',
    }}
  >
    {page}
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
          bgcolor: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(20px)',
          height: '60px',
          color: '#fafafa',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, md: 6 },
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
                letterSpacing: '-0.5px',
                fontSize: '1.1rem',
                color: '#fafafa',
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
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fafafa' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
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
            bgcolor: 'rgba(9, 9, 11, 0.97)',
            backdropFilter: 'blur(24px)',
            width: '100%',
            maxWidth: 300,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fafafa' }} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 4, pt: 4 }}>
          {pages.map((page) => (
            <ListItem key={page} disablePadding sx={{ mb: 3 }}>
              <ScrollLink
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: activePage === page ? '#38c0f2' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  width: '100%',
                  padding: '8px 0',
                  transition: 'color 0.2s ease',
                }}
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
