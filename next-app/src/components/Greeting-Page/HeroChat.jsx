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
  { label: 'What AI have you built?', variant: 'primary' },
  { label: 'Tell me about your experience', variant: 'secondary' },
  { label: 'Featured projects', variant: 'ghost' },
];

const chipStyles = {
  primary: {
    bg: 'rgba(129, 140, 248, 0.1)',
    border: 'rgba(129, 140, 248, 0.25)',
    color: '#A5B4FC',
    hoverBg: 'rgba(129, 140, 248, 0.18)',
    hoverBorder: 'rgba(129, 140, 248, 0.5)',
  },
  secondary: {
    bg: 'rgba(192, 132, 252, 0.1)',
    border: 'rgba(192, 132, 252, 0.25)',
    color: '#D8B4FE',
    hoverBg: 'rgba(192, 132, 252, 0.18)',
    hoverBorder: 'rgba(192, 132, 252, 0.5)',
  },
  ghost: {
    bg: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.1)',
    color: '#A1A1AA',
    hoverBg: 'rgba(255, 255, 255, 0.08)',
    hoverBorder: 'rgba(255, 255, 255, 0.2)',
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
    <Box sx={{ position: 'relative', width: '100%', height: '100%', color: '#F4F4F5', zIndex: 1 }}>
      {/* Pre-chat view */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          px: 3,
          opacity: started ? 0 : 1,
          transform: started ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
          pointerEvents: started ? 'none' : 'auto',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#818CF8',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              mb: 2.5,
              display: 'block',
            }}
          >
            SOFTWARE ENGINEER & AI BUILDER
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              mb: 2,
            }}
          >
            David Riva
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
          <Typography variant="body2" sx={{ color: '#F87171', fontSize: '0.8rem' }}>
            Verification failed — chat is temporarily unavailable.
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
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
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '& .MuiChip-label': {
                    color: s.color,
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.85,
                  },
                  '&:hover': {
                    background: s.hoverBg,
                    borderColor: s.hoverBorder,
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
            gap: 0.75,
            px: 2.5,
            py: 1,
            borderRadius: '50px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#71717A',
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(129, 140, 248, 0.3)',
              color: '#A5B4FC',
              background: 'rgba(129, 140, 248, 0.05)',
            },
          }}
        >
          Explore my work
          <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />
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
          transition: 'opacity 400ms ease-out 150ms',
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
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #818CF8, #C084FC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            D
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.2, color: '#F4F4F5' }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#52525B', lineHeight: 1.2 }}>
              Knows my experience, projects & skills
            </Typography>
          </Box>
          <Typography
            component="button"
            onClick={scrollToAbout}
            sx={{
              fontSize: '0.72rem',
              color: '#52525B',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              '&:hover': { color: '#818CF8' },
              transition: 'color 0.2s ease',
            }}
          >
            scroll for portfolio &darr;
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
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            background: 'rgba(9, 9, 11, 0.6)',
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
