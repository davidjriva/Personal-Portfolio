import * as React from 'react';
import { Link, Avatar, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import slugify from 'slugify';

const pages = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Awards'];

function NavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#3c4142',
        height: '100vh',
        width: '200px',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <IconButton href="/about">
            <Avatar
              alt="Photo of David Riva"
              src="/images/headshot.jpeg"
              sx={{
                width: 150,
                height: 150,
                boxShadow: '0 0 20px 5px rgba(211, 211, 211, 0.8)',
                border: '4px light gray',
              }}
            />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {pages.map((page) => (
            <Link
              href={`/${slugify(page.toLowerCase())}`}
              color="inherit"
              sx={{
                my: 1,
                fontWeight: 700,
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
              }}
              key={page}
            >
              {page}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
