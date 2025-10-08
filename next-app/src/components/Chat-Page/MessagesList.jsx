import { useRef, useEffect } from 'react';
import { Paper } from '@mui/material';

import MessageItem from '@/components/Chat-Page/MessageItem';

const MessagesList = ({ messages }) => {
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    return (
      <Paper
        variant="outlined"
        sx={{ p: 2, minHeight: 300, mb: 2, overflowY: 'auto', backgroundColor: '#2c2c2c', borderColor: '#444' }}
      >
        {messages.map((msg, i) => (
          <MessageItem key={i} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </Paper>
    );
};

export default MessagesList;