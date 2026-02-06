'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, IconButton, useTheme, alpha, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '@/contexts/ColorModeContext';
import './ScrollLink.css';

// Inline style for both active and inactive links
const linkStyles = {
  margin: '0 16px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'Montserrat, Arial, sans-serif',
  transition: 'all 0.3s ease', // smooth transition for on-hover and click-effects
};

const FormattedLink = ({ page, active, setActivePage }) => {
  const theme = useTheme();
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      onSetActive={() => setActivePage(page)}
      className="scroll-link"
      style={{
        ...linkStyles,
        color: active ? theme.palette.text.primary : theme.palette.text.secondary,
        fontWeight: active ? 'bold' : 'normal',
        borderBottom: active ? `2px solid ${theme.palette.text.primary}` : 'none',
        padding: '4px 8px',
      }}
    >
      {page}
    </ScrollLink>
  );
};



const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: '#141413',
        backdropFilter: 'blur(10px)',
        height: '64px',
        color: 'white',
        transition: 'all 0.3s ease',
        borderBottom: '0.0625rem solid #30302e',
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
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
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.25rem'
            }}
          >
            DAVID<span style={{ color: '#38c0f2' }}>RIVA</span>
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            {pages.map((page) => (
              <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
