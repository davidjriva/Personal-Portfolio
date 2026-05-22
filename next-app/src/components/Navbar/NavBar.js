'use client';

import { Link as ScrollLink } from 'react-scroll';
import {
  Toolbar,
  Box,
  AppBar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
          bgcolor: 'rgba(6, 6, 10, 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          height: '56px',
          color: '#fafafa',
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
            minHeight: '56px !important',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Typography
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.03em',
                fontSize: '1.1rem',
                color: '#fafafa',
              }}
            >
              david<span style={{ color: '#38c0f2' }}>riva</span>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {pages.map((page) => (
              <ScrollLink
                key={page}
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-60}
                duration={600}
                onSetActive={() => setActivePage(page)}
              >
                <Box
                  component="button"
                  sx={{
                    background: activePage === page ? 'rgba(56, 192, 242, 0.08)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 0.75,
                    color: activePage === page ? '#38c0f2' : '#71717a',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    letterSpacing: '-0.01em',
                    '&:hover': {
                      color: '#fafafa',
                      background: 'rgba(255, 255, 255, 0.04)',
                    },
                  }}
                >
                  {page}
                </Box>
              </ScrollLink>
            ))}
          </Box>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fafafa' }}
            aria-label="Open navigation menu"
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
            bgcolor: '#0c0c12',
            width: 260,
            borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#71717a' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pt: 2 }}>
          {pages.map((page) => (
            <ListItem key={page} disablePadding>
              <ScrollLink
                to={page.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-60}
                duration={600}
                onClick={() => setMobileOpen(false)}
                style={{ width: '100%' }}
              >
                <ListItemButton
                  sx={{
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
                  }}
                >
                  <ListItemText
                    primary={page}
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#a1a1aa',
                      letterSpacing: '-0.01em',
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
