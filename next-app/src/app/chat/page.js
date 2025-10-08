'use client';

import { Box } from '@mui/material';

import ParticleBackground from '@/components/ParticleBackground';
import ChatWindow from '@/components/Chat-Page/ChatWindow';

// --------------------- ChatPage ---------------------
export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative' }}>
      <ParticleBackground />
      <ChatWindow />
    </Box>
  );
}
