import { Link, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import Image from 'next/image';
import ParticleBar from './ParticleBackground';

const HeadShotImage = () => {
  return (
    <IconButton href="/">
      <Box
        sx={{
          width: 50,
          height: 50,
          overflow: 'hidden',
          borderRadius: '50%',
          boxShadow: '0 0 20px 5px rgba(211, 211, 211, 0.8)',
          border: '4px light gray',
        }}
      >
        <Image
          alt="Photo of David Riva"
          src="/images/headshot.jpeg"
          width={50}
          height={50}
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
        mx: 2,
        fontWeight: 700,
        fontSize: '1.2rem',
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
        height: '7vh',
        width: '100%',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2, // Add padding to the left and right
        backgroundColor: '#333', // Customize the background color
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ParticleBar />
      </Box>

      <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center', zIndex: 2 }}>
        <Box sx={{ mr: 2 }}>
          <HeadShotImage />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
