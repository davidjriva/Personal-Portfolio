import { Box } from '@mui/material';

import ParticleBackground from '@/components/ParticleBackground';
import ChatContainer from '@/components/Chat-Page/ChatContainer';

export default function ChatPage() {
  return (
    <Box sx={{ position: 'relative', backgroundColor: '#282829' }}>
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
      <ChatContainer />
    </Box>
  );
}
