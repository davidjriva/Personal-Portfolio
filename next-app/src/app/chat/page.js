'use client';

import { Box } from '@mui/material';
import HeroChat from '@/components/Greeting-Page/HeroChat';
import ParticleBackground from '@/components/ParticleBackground';

const ChatPage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        bgcolor: '#0a0a0b',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground backgroundColor="#0a0a0b" />
      <HeroChat />
    </Box>
  );
};

export default ChatPage;
