'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
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
      position="sticky"
      sx={{
        top: 0,
        zIndex: 999,
        width: '100%',
        bgcolor: 'background.paper',
        height: '64px',
        color: 'text.primary',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar constant sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: { xs: '0', sm: 'auto' }, marginRight: 'auto' }}>
           {/* Placeholder for left content if any, or centering logic adjustment */}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
