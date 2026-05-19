'use client';

import { useState } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
  {
    label: 'What AI have you built?',
    bg: 'rgba(129, 140, 248, 0.1)',
    border: 'rgba(129, 140, 248, 0.3)',
    color: '#a5b4fc',
    hoverBg: 'rgba(129, 140, 248, 0.18)',
    hoverBorder: 'rgba(129, 140, 248, 0.6)',
  },
  {
    label: 'Tell me about your experience',
    bg: 'rgba(52, 211, 153, 0.08)',
    border: 'rgba(52, 211, 153, 0.25)',
    color: '#6ee7b7',
    hoverBg: 'rgba(52, 211, 153, 0.16)',
    hoverBorder: 'rgba(52, 211, 153, 0.5)',
  },
  {
    label: 'Featured projects',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.15)',
    color: 'rgba(255, 255, 255, 0.6)',
    hoverBg: 'rgba(255, 255, 255, 0.1)',
    hoverBorder: 'rgba(255, 255, 255, 0.35)',
  },
];

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const { messages, started, sendMessage, addCachedExchange, fetchToken, hasToken } = useChat();

  const scrollToAbout = () => {
    const section = document.getElementById('about');
    if (!section) return;
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', color: '#fafafa', zIndex: 1 }}>
      {/* Pre-chat hero */}
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
          transform: started ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
          pointerEvents: started ? 'none' : 'auto',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#818cf8',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              mb: 2,
              display: 'block',
            }}
          >
            SOFTWARE ENGINEER
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'clamp(2.2rem, 8vw, 3.5rem)', md: 'clamp(3rem, 5vw, 4.5rem)' },
              fontWeight: 800,
              lineHeight: 1.05,
              mb: 1.5,
            }}
          >
            Hello, I&apos;m{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              David
            </Box>
          </Typography>

          <AnimatedTypingTypography />
        </Box>

        <Box sx={{ width: '100%', maxWidth: 520, mt: 1 }}>
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask my AI anything...'}
          />
        </Box>

        {turnstileError && (
          <Typography variant="body2" sx={{ color: 'rgba(248, 113, 113, 0.85)', fontSize: '0.8rem' }}>
            Verification failed — chat is temporarily unavailable.
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ gap: 1 }}>
          {CHIPS.map((chip) => (
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
                background: chip.bg,
                border: `1px solid ${chip.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderRadius: '8px',
                '& .MuiChip-label': {
                  color: chip.color,
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  px: 1.5,
                  py: 0.75,
                },
                '&:hover': {
                  background: chip.hoverBg,
                  borderColor: chip.hoverBorder,
                },
                '&.Mui-disabled': { opacity: 0.3 },
              }}
            />
          ))}
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
              onSuccess={(captchaToken) => {
                fetchToken(captchaToken);
                setNeedsChallenge(false);
              }}
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
            bottom: 40,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontWeight: 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flexDirection: 'column',
            '&:hover': { color: 'rgba(255,255,255,0.7)' },
            '@keyframes gentleBounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(4px)' },
            },
            animation: 'gentleBounce 2s ease-in-out infinite',
          }}
        >
          Scroll to explore
          <KeyboardArrowDownIcon sx={{ fontSize: '1.2rem' }} />
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
          transition: 'opacity 400ms ease-out 100ms',
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
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            D
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.2 }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
              Knows David&apos;s experience, projects &amp; skills
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.25)',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            scroll down for portfolio
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
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(9, 9, 11, 0.6)',
            backdropFilter: 'blur(12px)',
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
