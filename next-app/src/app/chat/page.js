'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.response }]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        mx: 'auto',
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', mb: 3 }}>
        Chat with your data
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          minHeight: 300,
          mb: 2,
          overflowY: 'auto',
          backgroundColor: '#2c2c2c',
          borderColor: '#444',
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              backgroundColor: msg.role === 'user' ? '#3a3a3a' : '#444',
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: msg.role === 'user' ? '#90caf9' : '#f48fb1',
                mb: 0.5,
              }}
            >
              {msg.role}:
            </Typography>

            {msg.role === 'assistant' ? (
              <ReactMarkdown
                children={msg.text}
                components={{
                  p: ({ node, ...props }) => <Typography variant="body1" sx={{ color: '#fff', mb: 0.5 }} {...props} />,
                  li: ({ node, ...props }) => <li style={{ color: '#fff', marginBottom: '4px' }} {...props} />,
                  strong: ({ node, ...props }) => <strong style={{ color: '#fff' }} {...props} />,
                  em: ({ node, ...props }) => <em style={{ color: '#fff' }} {...props} />,
                }}
              />
            ) : (
              <Typography variant="body1" sx={{ color: '#fff' }}>
                {msg.text}
              </Typography>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <CircularProgress size={20} sx={{ mr: 1, color: '#90caf9' }} />
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Assistant is typing...
            </Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          sx={{
            input: { color: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#888' },
              '&.Mui-focused fieldset': { borderColor: '#90caf9' },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          sx={{ backgroundColor: '#90caf9', color: '#000', '&:hover': { backgroundColor: '#64b5f6' } }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
