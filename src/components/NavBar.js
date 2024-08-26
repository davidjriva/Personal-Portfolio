import * as React from 'react';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Link, Avatar, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import options from '../particles-options/absorber.json';

const HeadShotImage = () => {
  return (
    <IconButton href="/">
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
  );
};

const FormattedLink = ({ page }) => {
  return (
    <Link
      href={`/${page.toLowerCase()}`}
      color="inherit"
      sx={{
        my: 1,
        fontWeight: 700,        
        fontSize: '1.2rem',
        width: '100%',
        textAlign: 'center',
        textDecoration: 'none',
        zIndex: 2,
      }}
      key={page}
    >
      {page}
    </Link>
  );
};

const pages = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Awards'];

const NavBar = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '100vh',
        width: '350px',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {init && <Particles id="tsparticles" options={options} />}
      </Box>

      <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <HeadShotImage />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
