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
  {
    label: 'What AI have you built?',
    color: '#38c0f2',
    bg: 'rgba(56,192,242,0.08)',
    border: 'rgba(56,192,242,0.25)',
    hoverBg: 'rgba(56,192,242,0.15)',
  },
  {
    label: 'Tell me about your experience',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.25)',
    hoverBg: 'rgba(167,139,250,0.15)',
  },
  {
    label: 'Featured projects',
    color: 'rgba(255,255,255,0.6)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.12)',
    hoverBg: 'rgba(255,255,255,0.08)',
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
    window.scrollTo({ top: elementPosition - 70, behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', color: '#fafafa', zIndex: 1 }}>
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
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            textAlign: 'center',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#fafafa' }}>Hello, I&apos;m </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #38c0f2, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            David
          </span>
        </Typography>

        <AnimatedTypingTypography />

        <Box sx={{ width: '100%', maxWidth: 520, mt: 1 }}>
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask me anything...'}
          />
        </Box>

        {turnstileError && (
          <Typography variant="caption" sx={{ color: 'rgba(248,113,113,0.85)', minHeight: '1.2em' }}>
            Verification failed — chat is temporarily unavailable.
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap sx={{ mt: 0.5 }}>
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
                transition: 'all 0.25s ease',
                '& .MuiChip-label': {
                  color: chip.color,
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  px: 1.5,
                  py: 0.8,
                },
                '&:hover': {
                  background: chip.hoverBg,
                  borderColor: chip.color,
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
            bottom: 36,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 2.5,
            py: 1,
            borderRadius: '10px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.25)',
              color: '#fafafa',
              background: 'rgba(255,255,255,0.04)',
            },
          }}
        >
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: '1rem' }} />
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
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38c0f2, #a78bfa)',
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
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2, color: '#fafafa' }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.2 }}>
              Knows David&apos;s experience, projects &amp; skills
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
            &darr; scroll for portfolio
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
            background: 'rgba(0,0,0,0.3)',
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
