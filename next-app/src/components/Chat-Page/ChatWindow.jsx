'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import ChatHeader from '@/components/Chat-Page/ChatHeader';
import MessagesList from '@/components/Chat-Page/MessagesList';
import ChatInput from '@/components/Chat-Page/ChatInput';

// --------------------- ChatPage ---------------------
export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      let assistantIndex;
      setMessages((prev) => {
        assistantIndex = prev.length;
        return [...prev, { role: 'assistant', text: '' }];
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setMessages((prev) => prev.map((msg, i) => (i === assistantIndex ? { ...msg, text: fullText } : msg)));
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, there was an error sending the message.' }]);
    }
  };

  return (
    <Box
    sx={{
        position: 'relative', // establish a stacking context
        zIndex: 1, // above the particle background
        maxWidth: 600,
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        p: 3,
        color: '#fff',
    }}
    >
    <ChatHeader />
    <MessagesList messages={messages} />
    <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </Box>
  );
}
