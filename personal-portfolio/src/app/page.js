import { Box } from '@mui/material';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <Box display="flex" minHeight="100vh">
      <NavBar />
      <Box
        component="main"
        flexGrow={1}
        p={2}
        sx={{
          overflowY: 'auto',
          ml: '350px',
        }}
      ></Box>
    </Box>
  );
}
