import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import MessageItem from '@/components/Chat-Page/MessageItem';

const MessagesList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      {messages.map((msg, i) => (
        <MessageItem key={i} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessagesList;
