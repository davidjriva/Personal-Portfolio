'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import './ScrollLink.css';

const FormattedLink = ({ page, sectionId, active, setActivePage }) => {
  return (
    <ScrollLink
      to={sectionId}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      onSetActive={() => setActivePage(sectionId)}
      className="scroll-link"
      style={{
        margin: '0 4px',
        padding: '6px 14px',
        borderRadius: '8px',
        fontWeight: active ? 600 : 400,
        fontSize: '0.85rem',
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: 'Montserrat, Arial, sans-serif',
        transition: 'all 0.25s ease',
        color: active ? '#00d4ff' : 'rgba(255, 255, 255, 0.5)',
        background: active ? 'rgba(0, 212, 255, 0.08)' : 'transparent',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const pages = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const NavBar = () => {
  const [activePage, setActivePage] = useState('about');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(10, 10, 18, 0.8)',
        backdropFilter: 'blur(20px)',
        height: '60px',
        color: '#e8e8ed',
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
          maxWidth: '1200px',
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          minHeight: '60px !important',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: '1.1rem',
              color: '#e8e8ed',
            }}
          >
            david<span style={{ color: '#00d4ff' }}>riva</span>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {pages.map((page) => (
            <FormattedLink
              key={page.id}
              page={page.label}
              sectionId={page.id}
              active={activePage === page.id}
              setActivePage={setActivePage}
            />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
