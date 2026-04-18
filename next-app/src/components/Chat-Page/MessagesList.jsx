import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import MessageItem from '@/components/Chat-Page/MessageItem';

const MessagesList = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box ref={containerRef} sx={{ height: '100%', overflowY: 'auto' }}>
      {messages.map((msg, i) => (
        <MessageItem key={i} msg={msg} />
      ))}
    </Box>
  );
};

export default MessagesList;
