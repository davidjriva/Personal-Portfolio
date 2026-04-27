'use client';

import { useState } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Turnstile } from '@marsidev/react-turnstile';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import ChatInput from '@/components/Chat-Page/ChatInput';
import MessagesList from '@/components/Chat-Page/MessagesList';
import useChat from '@/components/Chat-Page/hooks/useChat';

const CHIP_CACHE = {
  'What AI have you built?': `David has built several impressive AI projects.

**[Production RAG Pipeline](https://github.com/davidjriva/Production_RAG_Pipeline)** is a production-grade system for answering natural language questions over PDFs. It uses hybrid retrieval (Pinecone + BM25), cross-encoder reranking, and automated RAGAS quality gates to ensure faithfulness and relevancy. The pipeline is orchestrated with a LangGraph state machine and traced via LangSmith.

**[Agentic AI News Summary Service](https://github.com/davidjriva/Agentic_AI_News_Summary_Service)** is a fully automated newsletter that runs twice daily. It fetches from 10+ RSS feeds, scores each article with Claude using ephemeral prompt caching, and emails a ranked digest — all with zero manual intervention.

**[This portfolio's chat agent](https://github.com/davidjriva/Personal-Portfolio)** is the one you're talking to right now — a RAG agent built with Next.js and GPT-4o-mini, with streaming responses, JWT + Turnstile auth, Redis rate limiting, and a DeepEval eval suite.

David also took **1st place at C3 AI's Agentic AI Hackathon 2025**, building agentic developer tooling with React, TypeScript, and an in-house LLM.`,

  'Tell me about your experience': `Here's a quick overview of David's background.

Most recently he was a **Training Engineer, Generative AI at C3 AI** (Sept 2024 – Apr 2026), where he built and maintained their core training platform serving 8,000+ learners, created internal automation tools that cut feedback turnaround time by 80%, and won 1st place at the C3 Agentic AI Hackathon 2025.

Before that, he was a **Full-Stack Developer on a university research team at Colorado State University** (Dec 2022 – Jan 2024), building an accessible interface to 20TB+ environmental datasets using React, TypeScript, Python/Flask, and MongoDB. That project won the Excellence in Data Science Award at CSU's Celebrating Undergraduate Research Competition.

In between, he interned as a **Machine Learning Engineer at Hewlett Packard Inc.** (May – Aug 2023), building ETL pipelines on AWS and developing ML forecasting models with Scikit-Learn and Facebook Prophet.

David graduated from Colorado State University in May 2024 with a B.S. in Computer Science, *Summa Cum Laude*.`,

  'Featured projects': `Here are three of David's featured projects.

**[Production RAG Pipeline](https://github.com/davidjriva/Production_RAG_Pipeline)** *(Mar – Apr 2025)* — a production-grade RAG system for answering natural language questions over PDFs. It combines dense and BM25 retrieval, cross-encoder reranking, and RAGAS quality gates to keep responses accurate and grounded. Built with LangChain, LangGraph, Pinecone, and FastAPI.

**[Agentic AI News Summary Service](https://github.com/davidjriva/Agentic_AI_News_Summary_Service)** *(Feb – Mar 2025)* — an automated newsletter pipeline that fetches from 10+ RSS feeds, scores articles with Claude (using prompt caching), and emails a ranked daily digest. Runs on a launchd schedule with a FastAPI dashboard — no infrastructure needed.

**[This portfolio](https://github.com/davidjriva/Personal-Portfolio)** *(Nov 2024 – Apr 2025)* — the site you're on now. It has an embedded GPT-4o-mini RAG agent, streaming SSE responses, JWT + Turnstile auth, Redis rate limiting, and a DeepEval automated eval suite. Built with Next.js, React, and MUI.`,
};

const CHIPS = [
  { label: 'What AI have you built?', variant: 'primary' },
  { label: 'Tell me about your experience', variant: 'secondary' },
  { label: 'Featured projects', variant: 'neutral' },
];

const chipStyles = {
  primary: {
    bg: 'rgba(56,192,242,0.08)',
    border: 'rgba(56,192,242,0.25)',
    color: '#38c0f2',
    hoverBg: 'rgba(56,192,242,0.16)',
    hoverBorder: 'rgba(56,192,242,0.5)',
  },
  secondary: {
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
    color: '#a78bfa',
    hoverBg: 'rgba(139,92,246,0.16)',
    hoverBorder: 'rgba(139,92,246,0.5)',
  },
  neutral: {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.12)',
    color: 'rgba(240,240,245,0.7)',
    hoverBg: 'rgba(255,255,255,0.08)',
    hoverBorder: 'rgba(255,255,255,0.25)',
  },
};

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const { messages, started, sendMessage, addCachedExchange, fetchToken, hasToken } = useChat();

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
    <Box sx={{ position: 'relative', width: '100%', height: '100%', color: '#f0f0f5', zIndex: 1 }}>
      {/* Pre-chat view */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2.5,
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
            fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            textAlign: 'center',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#f0f0f5' }}>Hello, I&apos;m </span>
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            David
          </Box>
        </Typography>

        <AnimatedTypingTypography />

        <Box sx={{ width: '100%', maxWidth: 520, mt: 1 }}>
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask me anything about David...'}
          />
        </Box>

        {turnstileError && (
          <Typography variant="caption" sx={{ color: 'rgba(255,100,100,0.85)', textTransform: 'none', letterSpacing: 0, minHeight: '1.2em' }}>
            Verification failed — chat is temporarily unavailable.
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mt: 0.5 }}>
          {CHIPS.map((chip) => {
            const s = chipStyles[chip.variant];
            return (
              <Chip
                key={chip.label}
                label={chip.label}
                disabled={!hasToken}
                onClick={() => {
                  const cached = CHIP_CACHE[chip.label];
                  if (cached) addCachedExchange(chip.label, cached);
                  else sendMessage(chip.label);
                  setInput('');
                }}
                sx={{
                  height: 'auto',
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '& .MuiChip-label': {
                    color: s.color,
                    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.85,
                  },
                  '&:hover': {
                    background: s.hoverBg,
                    borderColor: s.hoverBorder,
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-disabled': { opacity: 0.35 },
                }}
              />
            );
          })}
        </Stack>

        {!hasToken && !turnstileError && (
          <Box
            sx={{
              visibility: needsChallenge ? 'visible' : 'hidden',
              height: needsChallenge ? 'auto' : 0,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(captchaToken) => { fetchToken(captchaToken); setNeedsChallenge(false); }}
              onError={() => setTurnstileError(true)}
              onBeforeInteractive={() => setNeedsChallenge(true)}
              options={{ appearance: 'interaction-only' }}
            />
          </Box>
        )}

        <Box
          component="button"
          onClick={scrollToAbout}
          sx={{
            position: 'absolute',
            bottom: 36,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 2.5,
            py: 1,
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(240,240,245,0.6)',
            fontFamily: 'var(--font-montserrat), Arial, sans-serif',
            fontWeight: 500,
            fontSize: '0.8rem',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.25)',
              color: '#f0f0f5',
              background: 'rgba(255,255,255,0.06)',
              transform: 'translateY(-2px)',
            },
            '@keyframes gentleBounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(3px)' },
            },
            animation: 'gentleBounce 2.5s ease-in-out infinite',
            '&:hover': {
              animation: 'none',
              borderColor: 'rgba(255,255,255,0.25)',
              color: '#f0f0f5',
              background: 'rgba(255,255,255,0.06)',
            },
          }}
        >
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: '1rem' }} />
          Explore my work
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
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 3,
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            D
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2, color: '#f0f0f5' }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(240,240,245,0.35)', lineHeight: 1.2 }}>
              Knows David&apos;s experience, projects &amp; skills
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'rgba(240,240,245,0.25)' }}>
            &#8595; scroll for portfolio
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', px: 2, pt: 1 }}>
          <MessagesList messages={messages} />
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            px: 3,
            py: 1.5,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={!hasToken ? 'Verifying...' : 'Ask anything...'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroChat;
