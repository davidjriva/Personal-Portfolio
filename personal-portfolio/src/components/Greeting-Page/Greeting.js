import { Box, Typography } from '@mui/material';
import ParticleBar from '@/components/ParticleBar';

const Greeting = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Typography variant="h1" sx={{ zIndex: 1, position: 'relative' }}>
        Hello, I'm David.
      </Typography>
      <Typography variant="h1" sx={{ zIndex: 1, position: 'relative' }}>
        I'm a full-stack developer
      </Typography>
      <ParticleBar />
    </Box>
  );
};

export default Greeting;
