'use client';

import { useState } from 'react';
import { Box, Typography, Chip, Stack, IconButton, Link } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
  { label: 'What AI have you built?', variant: 'accent' },
  { label: 'Tell me about your experience', variant: 'muted' },
  { label: 'Featured projects', variant: 'muted' },
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
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#e8e6e3', zIndex: 1 }}>
      {/* Pre-chat hero */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 4, md: 8 },
          px: { xs: 3, md: 6, lg: 10 },
          maxWidth: '1400px',
          mx: 'auto',
          opacity: started ? 0 : 1,
          transform: started ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
          pointerEvents: started ? 'none' : 'auto',
        }}
      >
        {/* Left side — identity */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: 560,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#d4a053',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            SOFTWARE ENGINEER
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'clamp(2.5rem, 7vw, 3.5rem)', md: '3.75rem' },
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              mb: 1.5,
            }}
          >
            David Riva
          </Typography>

          <AnimatedTypingTypography />

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 3, alignItems: 'center' }}
          >
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="GitHub Profile"
                sx={{
                  color: 'rgba(232, 230, 227, 0.35)',
                  '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(232, 230, 227, 0.06)' },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="LinkedIn Profile"
                sx={{
                  color: 'rgba(232, 230, 227, 0.35)',
                  '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(232, 230, 227, 0.06)' },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton
              aria-label="Resume"
              onClick={() => window.open('/documents/resume.pdf', '_blank')}
              sx={{
                color: 'rgba(232, 230, 227, 0.35)',
                '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(232, 230, 227, 0.06)' },
              }}
            >
              <DescriptionOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Right side — chat interface */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 520,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(232, 230, 227, 0.02)',
              border: '1px solid rgba(232, 230, 227, 0.06)',
              borderRadius: '16px',
              p: 3,
              backdropFilter: 'blur(16px)',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(232, 230, 227, 0.35)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Ask my AI agent anything
            </Typography>

            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={handleSend}
              disabled={!hasToken}
              placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask about my work...'}
            />

            {turnstileError && (
              <Typography
                variant="body2"
                sx={{ color: 'rgba(220, 100, 100, 0.8)', mt: 1.5, fontSize: '0.8rem' }}
              >
                Verification failed — chat is temporarily unavailable.
              </Typography>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2.5 }}>
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
                    bgcolor: chip.variant === 'accent' ? 'rgba(212, 160, 83, 0.08)' : 'rgba(232, 230, 227, 0.04)',
                    border:
                      chip.variant === 'accent'
                        ? '1px solid rgba(212, 160, 83, 0.2)'
                        : '1px solid rgba(232, 230, 227, 0.08)',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    '& .MuiChip-label': {
                      color:
                        chip.variant === 'accent' ? '#d4a053' : 'rgba(232, 230, 227, 0.55)',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      px: 1.5,
                      py: 0.75,
                    },
                    '&:hover': {
                      bgcolor:
                        chip.variant === 'accent' ? 'rgba(212, 160, 83, 0.14)' : 'rgba(232, 230, 227, 0.08)',
                      borderColor:
                        chip.variant === 'accent' ? 'rgba(212, 160, 83, 0.4)' : 'rgba(232, 230, 227, 0.15)',
                    },
                    '&.Mui-disabled': { opacity: 0.3 },
                  }}
                />
              ))}
            </Stack>
          </Box>

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
        </Box>
      </Box>

      {/* Scroll indicator */}
      <Box
        component="button"
        onClick={scrollToAbout}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: started ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'transparent',
          border: '1px solid rgba(232, 230, 227, 0.12)',
          color: 'rgba(232, 230, 227, 0.35)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 2,
          '@keyframes float': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(4px)' },
          },
          animation: 'float 2.5s ease-in-out infinite',
          '&:hover': {
            borderColor: 'rgba(232, 230, 227, 0.3)',
            color: '#e8e6e3',
          },
        }}
      >
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>

      {/* Chat-active view */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          opacity: started ? 1 : 0,
          transition: 'opacity 400ms ease-out 120ms',
          pointerEvents: started ? 'auto' : 'none',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: { xs: 2, md: 4 },
            py: 1.5,
            borderBottom: '1px solid rgba(232, 230, 227, 0.06)',
            mt: '56px',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d4a053, #b8863a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: '#0c0c0e',
              flexShrink: 0,
            }}
          >
            DR
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.2, color: '#e8e6e3' }}>
              David&apos;s AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(232, 230, 227, 0.3)', lineHeight: 1.2 }}>
              Knows my experience, projects & skills
            </Typography>
          </Box>
          <Typography
            component="button"
            onClick={scrollToAbout}
            sx={{
              fontSize: '0.7rem',
              color: 'rgba(232, 230, 227, 0.3)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-inter), sans-serif',
              '&:hover': { color: '#d4a053' },
            }}
          >
            scroll to portfolio ↓
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', px: { xs: 1, md: 2 }, pt: 1 }}>
          <MessagesList messages={messages} />
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            px: { xs: 2, md: 4 },
            py: 1.5,
            borderTop: '1px solid rgba(232, 230, 227, 0.06)',
            bgcolor: 'rgba(12, 12, 14, 0.6)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
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
    </Box>
  );
};

export default HeroChat;
