import * as React from 'react';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { Link, Avatar, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import options from '../particles-options/default.json';

const pages = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Awards'];

function NavBar() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log('Particles successfully loaded! 🧬');
    console.log(container);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
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
        position: 'relative', // Ensure particles are within the navbar
        backgroundColor: 'rgba(60, 65, 66, 0.85)', // Semi-transparent background
        zIndex: 1, // Ensure content is above particles
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />}
      </Box>

      <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
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
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {pages.map((page) => (
            <Link
              href={`/${page.toLowerCase()}`}
              color="inherit"
              sx={{
                my: 1,
                fontWeight: 700,
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
                zIndex: 2, // Ensure links are above particles
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
