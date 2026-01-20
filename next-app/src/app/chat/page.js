'use client';

import { Box, Button } from '@mui/material';
import StyledButton from '@/components/StyledButton';
import ParticleBackground from '@/components/ParticleBackground';
import ChatContainer from '@/components/Chat-Page/ChatContainer';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative', backgroundColor: '#282829' }}>
      {/* Back Button */}
      <Box sx={{ position: 'absolute', top: '3rem', left: '3rem', zIndex: 1 }}>
        <StyledButton href="/" text={'Return to home'} icon={<HomeIcon />} component={Link} />
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
