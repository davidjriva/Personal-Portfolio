'use client';

import { Box, Typography, Stack } from '@mui/material';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import ViewWorkButton from '@/components/Greeting-Page/ViewWorkButton';
import AgentChatButton from '@/components/Greeting-Page/AgentChatButton';


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
        position: 'relative',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>

      <AnimatedTypingTypography />

      <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
        <ViewWorkButton />
        <AgentChatButton />
      </Stack>
    </Box>
  );
};

export default Greeting;
