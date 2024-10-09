import { Box, Typography } from '@mui/material';
import ParticleBar from '@/components/ParticleBar';
import ViewWorkButton from '@/components/Greeting-Page/ViewWorkButton';

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
      <ParticleBar />
      <Typography variant="h1" sx={{ zIndex: 1, position: 'relative' }}>
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>
      <Typography variant="h1" sx={{ zIndex: 1, position: 'relative' }}>
        I'm a full-stack developer
      </Typography>

      <ViewWorkButton />
    </Box>
  );
};

export default Greeting;
