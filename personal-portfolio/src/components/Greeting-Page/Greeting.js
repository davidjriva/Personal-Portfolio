import { Box, Typography } from '@mui/material';
import ViewWorkButton from '@/components/Greeting-Page/ViewWorkButton';

const Greeting = () => {
  return (
    <Box
      sx={{
        color: 'white',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Typography variant="h1">
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>
      <Typography variant="h1">I'm a full-stack developer</Typography>

      <ViewWorkButton />
    </Box>
  );
};

export default Greeting;
