'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const pages = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const NavLink = ({ page, active, setActivePage, onClick }) => (
  <ScrollLink
    to={page.toLowerCase()}
    spy={true}
    smooth={true}
    offset={-80}
    duration={600}
    onSetActive={() => setActivePage(page)}
    onClick={onClick}
    style={{
      fontSize: '0.8rem',
      fontWeight: active ? 600 : 500,
      textDecoration: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
      letterSpacing: '0.04em',
      transition: 'color 0.2s ease',
      color: active ? '#fafafa' : '#71717a',
      padding: '6px 12px',
      borderRadius: '8px',
      background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.color = '#a1a1aa';
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.color = '#71717a';
    }}
  >
    {page}
  </ScrollLink>
);

const NavBar = () => {
  const [activePage, setActivePage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: { xs: 0, md: 16 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '100%', md: 'auto' },
          maxWidth: { md: '520px' },
          zIndex: 1100,
          bgcolor: 'rgba(9, 9, 11, 0.7)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
          height: { xs: '56px', md: '48px' },
          color: '#fafafa',
          border: { xs: 'none', md: '1px solid rgba(255,255,255,0.06)' },
          borderBottom: { xs: '1px solid rgba(255,255,255,0.06)', md: undefined },
          borderRadius: { xs: 0, md: '14px' },
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'space-between', md: 'center' },
            minHeight: { xs: '56px', md: '48px' },
            px: { xs: 2, md: 1.5 },
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '-0.02em',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            DR
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {pages.map((page) => (
              <NavLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#a1a1aa' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#09090b',
            width: 240,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#a1a1aa' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {pages.map((page) => (
            <ListItem key={page} disablePadding>
              <ScrollLink
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={600}
                onClick={() => setDrawerOpen(false)}
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <ListItemButton sx={{ px: 3, py: 1.5 }}>
                  <ListItemText
                    primary={page}
                    primaryTypographyProps={{
                      sx: {
                        color: '#a1a1aa',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                      },
                    }}
                  />
                </ListItemButton>
              </ScrollLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
