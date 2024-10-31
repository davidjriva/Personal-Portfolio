'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar } from '@mui/material';
import { useState } from 'react';

// Inline style for both active and inactive links
const linkStyles = {
  margin: '0 16px',
  fontWeight: 700,
  fontSize: '1.2rem',
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'Montserrat, Arial, sans-serif'
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
      style={{
        ...linkStyles,
        color: active ? 'white' : 'gray',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const pages = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Awards'];

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
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {pages.map((page) => (
            <FormattedLink
              key={page}
              page={page}
              active={activePage === page} // Pass active state to link
              setActivePage={setActivePage} // Set active page on section change
            />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
