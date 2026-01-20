'use client';

import { Box } from '@mui/material';
import StyledButton from '@/components/StyledButton';
import ParticleBackground from '@/components/ParticleBackground';
import ChatContainer from '@/components/Chat-Page/ChatContainer';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative', backgroundColor: '#282829', minHeight: '100vh' }}>
      {/* Back Button */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '1rem', sm: '2rem', md: '3rem' },
          left: { xs: '1rem', sm: '2rem', md: '3rem' },
          zIndex: 10,
        }}
      >
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
          pointerEvents: 'none',
        }}
      >
        <ParticleBackground interactive={false} />
      </Box>

      {/* Chat Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1, 
          paddingTop: { xs: '5rem', sm: '6rem', md: '7rem' },
          overflow: 'hidden',
        }}
      >
        <ChatContainer />
      </Box>
    </Box>
  );
}
