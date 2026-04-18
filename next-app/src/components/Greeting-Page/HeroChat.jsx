'use client';

import { useState } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Turnstile } from '@marsidev/react-turnstile';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import ChatInput from '@/components/Chat-Page/ChatInput';
import MessagesList from '@/components/Chat-Page/MessagesList';
import useChat from '@/components/Chat-Page/hooks/useChat';

const CHIPS = [
  {
    label: '🤖 What AI have you built?',
    bg: 'rgba(56,192,242,0.14)',
    border: 'rgba(56,192,242,0.55)',
    color: '#38c0f2',
    hoverBg: 'rgba(56,192,242,0.26)',
    hoverBorder: 'rgba(56,192,242,0.9)',
    glow: '0 0 14px rgba(56,192,242,0.35)',
  },
  {
    label: '💼 Tell me about your experience',
    bg: 'rgba(110,64,201,0.14)',
    border: 'rgba(110,64,201,0.55)',
    color: '#b894ff',
    hoverBg: 'rgba(110,64,201,0.28)',
    hoverBorder: 'rgba(110,64,201,0.9)',
    glow: '0 0 14px rgba(110,64,201,0.35)',
  },
  {
    label: '🚀 Featured projects',
    bg: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.3)',
    color: 'rgba(255,255,255,0.85)',
    hoverBg: 'rgba(255,255,255,0.16)',
    hoverBorder: 'rgba(255,255,255,0.6)',
    glow: 'none',
  },
];

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const { messages, started, sendMessage, fetchToken, hasToken } = useChat();

  const scrollToAbout = () => {
    const section = document.getElementById('about');
    if (!section) return;
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - 70, behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', color: '#ffffff', zIndex: 1 }}>
      {/* Pre-chat view */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          px: 3,
          opacity: started ? 0 : 1,
          transform: started ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          pointerEvents: started ? 'none' : 'auto',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#ffffff' }}>Hello, I&apos;m </span>
          <span style={{ color: '#38c0f2' }}>David</span>
        </Typography>

        <AnimatedTypingTypography />

        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <ChatInput input={input} setInput={setInput} sendMessage={handleSend} disabled={!hasToken} />
        </Box>

        {turnstileError && (
          <Typography variant="caption" sx={{ color: 'rgba(255,100,100,0.85)', minHeight: '1.2em' }}>
            Verification failed — chat is temporarily unavailable.
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          {CHIPS.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              disabled={!hasToken}
              onClick={() => { sendMessage(chip.label); setInput(''); }}
              sx={{
                height: 'auto',
                background: chip.bg,
                border: `1px solid ${chip.border}`,
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '& .MuiChip-label': {
                  color: chip.color,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                },
                '&:hover': {
                  background: chip.hoverBg,
                  borderColor: chip.hoverBorder,
                  boxShadow: chip.glow,
                },
                '&.Mui-disabled': { opacity: 0.4 },
              }}
            />
          ))}
        </Stack>

        {/* Turnstile — runs silently; only shows UI if Cloudflare requires a challenge */}
        {!hasToken && !turnstileError && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(captchaToken) => fetchToken(captchaToken)}
              onError={() => setTurnstileError(true)}
              appearance="interaction-only"
            />
          </Box>
        )}

        <Box
          component="button"
          onClick={scrollToAbout}
          sx={{
            position: 'absolute',
            bottom: 32,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.25,
            borderRadius: '50px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.4)',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': { borderColor: 'rgba(255,255,255,0.7)', color: '#fff', background: 'rgba(255,255,255,0.07)' },
          }}
        >
          <KeyboardDoubleArrowDownIcon fontSize="small" />
          View my work
        </Box>
      </Box>

      {/* Chat-active view */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          opacity: started ? 1 : 0,
          transition: 'opacity 300ms ease-out 100ms',
          pointerEvents: started ? 'auto' : 'none',
        }}
      >
        {/* Agent header */}
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 3,
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            D
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
              Knows David&apos;s experience, projects &amp; skills
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            ↓ scroll for portfolio
          </Typography>
        </Box>

        {/* Messages list — minHeight: 0 forces flex to respect overflow boundary */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', px: 2, pt: 1 }}>
          <MessagesList messages={messages} />
        </Box>

        {/* Input bar */}
        <Box
          sx={{
            flexShrink: 0,
            px: 3,
            py: 1.5,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <ChatInput input={input} setInput={setInput} sendMessage={handleSend} disabled={!hasToken} />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroChat;
