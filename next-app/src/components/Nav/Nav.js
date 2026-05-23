'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as ScrollLink } from 'react-scroll';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyles = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'text.secondary',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': { color: 'primary.main' },
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          px: { xs: 3, md: 6 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          ...(scrolled && {
            bgcolor: 'rgba(9, 9, 11, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            py: 1.5,
          }),
        }}
      >
        <ScrollLink to="hero" smooth duration={600} style={{ cursor: 'pointer' }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: '0.05em',
            }}
          >
            DR
          </Typography>
        </ScrollLink>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
          {navLinks.map((link) => (
            <ScrollLink key={link.to} to={link.to} smooth duration={600} offset={-80} spy style={{ cursor: 'pointer' }}>
              <Typography sx={linkStyles}>{link.label}</Typography>
            </ScrollLink>
          ))}
        </Box>

        <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#18181b',
            width: 280,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.to} sx={{ px: 0, py: 1.5 }}>
              <ScrollLink
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                onClick={() => setMobileOpen(false)}
                style={{ cursor: 'pointer', width: '100%' }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </Typography>
              </ScrollLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
