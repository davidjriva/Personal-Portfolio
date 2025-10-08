import { Box } from '@mui/material';

import ParticleBackground from '@/components/ParticleBackground';
import ChatContainer from '@/components/Chat-Page/ChatContainer';

export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative' }}>
      <ParticleBackground interactive={false} />
      <ChatContainer />
    </Box>
  );
}
