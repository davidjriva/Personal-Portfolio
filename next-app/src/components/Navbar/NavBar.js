'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkSx = (active) => ({
    color: active ? '#f0ede6' : 'rgba(240, 237, 230, 0.6)',
    fontWeight: active ? 600 : 400,
    fontSize: '0.875rem',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#f0ede6',
      bgcolor: 'rgba(240, 237, 230, 0.04)',
    },
  });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: 1100,
          width: '100%',
          bgcolor: 'rgba(10, 10, 11, 0.8)',
          backdropFilter: 'blur(20px)',
          height: '64px',
          color: '#f0ede6',
          borderBottom: '1px solid rgba(240, 237, 230, 0.06)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 }, height: '100%' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#f0ede6',
                letterSpacing: '-0.02em',
              }}
            >
              DR
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {pages.map((page) => (
              <ScrollLink
                key={page}
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => setActivePage(page)}
                style={{ textDecoration: 'none' }}
              >
                <Box component="span" sx={linkSx(activePage === page)}>
                  {page}
                </Box>
              </ScrollLink>
            ))}
            <Box
              component={Link}
              href="/chat"
              sx={{
                ...linkSx(false),
                ml: 1,
                border: '1px solid rgba(240, 237, 230, 0.1)',
                borderRadius: '50px',
                px: 2,
                py: 0.75,
                fontSize: '0.8rem',
                textDecoration: 'none',
                '&:hover': {
                  color: '#f0ede6',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  bgcolor: 'rgba(245, 158, 11, 0.05)',
                },
              }}
            >
              Chat
            </Box>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#f0ede6' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(10, 10, 11, 0.95)',
            backdropFilter: 'blur(20px)',
            width: 260,
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#f0ede6' }}>
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
                duration={500}
                onClick={() => setMobileOpen(false)}
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <ListItemButton sx={{ px: 3, py: 1.5 }}>
                  <ListItemText
                    primary={page}
                    primaryTypographyProps={{
                      sx: { color: 'rgba(240, 237, 230, 0.8)', fontWeight: 500, fontSize: '1rem' },
                    }}
                  />
                </ListItemButton>
              </ScrollLink>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/chat" sx={{ px: 3, py: 1.5 }}>
              <ListItemText
                primary="Chat"
                primaryTypographyProps={{
                  sx: { color: 'rgba(240, 237, 230, 0.8)', fontWeight: 500, fontSize: '1rem' },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
