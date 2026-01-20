import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import MessagesList from '@/components/Chat-Page/MessagesList';
import ChatInput from '@/components/Chat-Page/ChatInput';
import useChat from '@/components/Chat-Page/hooks/useChat';

const ChatContainer = () => {
  const [input, setInput] = useState('');
  const { messages, started, sendMessage } = useChat();

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 768,
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        color: '#fff',
      }}
    >
      {!started ? (
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="h5" sx={{ color: '#fff', mb: 3 }}>
            Hey, I'm David's assistant. Ready to learn more?
          </Typography>
          <ChatInput input={input} setInput={setInput} sendMessage={handleSend} />
        </Box>
      ) : (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <MessagesList messages={messages} />
          <ChatInput input={input} setInput={setInput} sendMessage={handleSend} />
        </Box>
      )}
    </Box>
  );
};

export default ChatContainer;
