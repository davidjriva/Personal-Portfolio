'use client';

import { Box } from '@mui/material';
import StyledButton from '@/components/Buttons/StyledButton';
import ParticleBackground from '@/components/ParticleBackground';
import ChatContainer from '@/components/Chat-Page/ChatContainer';
import HomeIcon from '@mui/icons-material/Home';
import { redirect } from 'next/navigation';

export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative', backgroundColor: '#282829' }}>
      {/* Back Button */}
      <Box sx={{ position: 'absolute', top: '3rem', left: '3rem', zIndex: 1 }}>
        <StyledButton onClick={() => redirect('/')} text={'Return to home'} icon={<HomeIcon />} />
      </Box>

      {/* Particle Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <ParticleBackground interactive={false} />
      </Box>

      {/* Chat Container */}
      <ChatContainer />
    </Box>
  );
}
