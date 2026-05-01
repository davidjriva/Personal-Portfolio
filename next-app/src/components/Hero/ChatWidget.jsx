'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ChatInput from '@/components/Chat-Page/ChatInput';
import MessagesList from '@/components/Chat-Page/MessagesList';

const ChatWidget = ({ open, onToggle, messages, started, sendMessage, hasToken, turnstileError }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating toggle button */}
      <Box
        component="button"
        onClick={onToggle}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
          width: 52,
          height: 52,
          borderRadius: '16px',
          background: open ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #a78bfa, #38bdf8)',
          border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: open ? 'none' : '0 8px 32px rgba(167, 139, 250, 0.25)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {open ? (
          <CloseIcon sx={{ color: '#fafafa', fontSize: '1.2rem' }} />
        ) : (
          <ChatBubbleOutlineIcon sx={{ color: '#09090b', fontSize: '1.3rem' }} />
        )}
      </Box>

      {/* Chat panel */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          zIndex: 1200,
          width: { xs: 'calc(100vw - 48px)', sm: '400px' },
          maxWidth: '400px',
          height: '500px',
          maxHeight: 'calc(100vh - 140px)',
          borderRadius: '20px',
          bgcolor: 'rgba(15, 15, 20, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 2,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.75rem',
              color: '#09090b',
              flexShrink: 0,
            }}
          >
            AI
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2, color: '#fafafa' }}>
              Ask about David
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
              Powered by GPT-4o-mini with RAG
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', px: 1.5, pt: 1 }}>
          {messages.length === 0 ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  px: 3,
                }}
              >
                Ask me anything about David&apos;s experience, projects, or skills.
              </Typography>
            </Box>
          ) : (
            <MessagesList messages={messages} />
          )}
        </Box>

        {/* Input */}
        <Box
          sx={{
            flexShrink: 0,
            px: 2,
            py: 1.5,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask anything...'}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatWidget;
