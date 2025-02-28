'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar } from '@mui/material';
import { useState } from 'react';
import './ScrollLink.css';

// Inline style for both active and inactive links
const linkStyles = {
  margin: '0 16px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'Montserrat, Arial, sans-serif',
};

const FormattedLink = ({ page, active, setActivePage }) => {
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
        color: active ? 'white' : 'gray',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const pages = ['About', 'Skills', 'Awards', 'Projects'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 999,
        height: '7vh',
        backgroundColor: '#333',
        height: '100%',
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: { xs: '0', sm: 'auto' } }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
