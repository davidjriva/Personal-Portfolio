'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

import MessagesList from '@/components/Chat-Page/MessagesList';
import ChatInput from '@/components/Chat-Page/ChatInput';

const ChatContainer = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);

  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const currentStreamController = useRef(null);
  const assistantTextRef = useRef('');

  // Get JWT token and sessionId
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch('/api/token');
        const data = await res.json();
        setToken(data.token);
        setSessionId(data.sessionId);
      } catch (err) {
        console.error('Failed to get token:', err);
      }
    };
    getToken();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    if (!started) setStarted(true);

    // Cancel previous streaming
    if (currentStreamController.current) {
      currentStreamController.current.abort();
    }

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    const controller = new AbortController();
    currentStreamController.current = controller;

    // Placeholder for assistant
    let assistantIndex;
    assistantTextRef.current = '';
    setMessages((prev) => {
      assistantIndex = prev.length;
      return [...prev, { role: 'assistant', text: '', typing: true }];
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage, sessionId }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', type: 'rate-limit', text: data.error },
        ]);
        return;
      }

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';
      let updateScheduled = false;

      const flushBuffer = () => {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === assistantIndex
              ? { ...msg, text: assistantTextRef.current + buffer, typing: true }
              : msg
          )
        );
        assistantTextRef.current += buffer;
        buffer = '';
        updateScheduled = false;
      };

      const scheduleUpdate = () => {
        if (!updateScheduled) {
          updateScheduled = true;
          requestAnimationFrame(flushBuffer);
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        scheduleUpdate();
      }

      // Final flush
      if (buffer) flushBuffer();

      // Stop typing
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === assistantIndex ? { ...msg, typing: false } : msg
        )
      );
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Previous stream aborted');
      } else {
        console.error('Error sending message:', err);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Sorry, there was an error sending the message.' },
        ]);
      }
    } finally {
      currentStreamController.current = null;
    }
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
          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
        </Box>
      ) : (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <MessagesList messages={messages} />
          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
        </Box>
      )}
    </Box>
  );
};

export default ChatContainer;
