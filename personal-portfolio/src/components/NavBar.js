import { Link, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import Image from 'next/image';
import ParticleBar from './ParticleBar';

const HeadShotImage = () => {
  return (
    <IconButton href="/">
      <Box
        sx={{
          width: 150,
          height: 150,
          overflow: 'hidden',
          borderRadius: '50%',
          boxShadow: '0 0 20px 5px rgba(211, 211, 211, 0.8)',
          border: '4px light gray',
        }}
      >
        <Image
          alt="Photo of David Riva"
          src="/images/headshot.jpeg"
          width={150}
          height={150}
          style={{
            objectFit: 'cover',
          }}
          priority={true}
        />
      </Box>
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
        fontFamily: 'Montserrat, Arial, sans-serif',
      }}
      key={page}
    >
      {page}
    </Link>
  );
};

const pages = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Awards'];

const NavBar = () => {
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
        <ParticleBar />
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
