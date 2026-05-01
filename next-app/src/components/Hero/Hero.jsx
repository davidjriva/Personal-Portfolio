'use client';

import { useState } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Turnstile } from '@marsidev/react-turnstile';
import AnimatedRole from './AnimatedRole';
import ChatWidget from './ChatWidget';
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

const QUICK_ACTIONS = [
  { label: 'What AI have you built?', color: '#a78bfa' },
  { label: 'Tell me about your experience', color: '#38bdf8' },
  { label: 'Featured projects', color: '#fafafa' },
];

const Hero = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const { messages, started, sendMessage, addCachedExchange, fetchToken, hasToken } = useChat();

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleChipClick = (label) => {
    if (!chatOpen) setChatOpen(true);
    const cached = CHIP_CACHE[label];
    if (cached) addCachedExchange(label, cached);
    else sendMessage(label);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 2.5, sm: 4, md: 6 },
        pt: { xs: 12, md: 0 },
        pb: { xs: 8, md: 0 },
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-15%',
          width: '50vw',
          height: '50vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      {/* Noise texture overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <Box sx={{ maxWidth: '720px' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.85rem',
              fontWeight: 500,
              mb: 3,
              letterSpacing: '0.04em',
            }}
          >
            Bay Area, CA
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'clamp(2.5rem, 8vw, 4.5rem)', md: '4.5rem' },
              mb: 2,
            }}
          >
            David Riva
          </Typography>

          <AnimatedRole />

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px',
              mt: 3,
              mb: 4,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}
          >
            Building production AI systems and full-stack applications. Previously at C3 AI, HP, and Colorado State
            University.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 4 }}
          >
            {QUICK_ACTIONS.map((action) => (
              <Chip
                key={action.label}
                label={action.label}
                disabled={!hasToken}
                onClick={() => handleChipClick(action.label)}
                sx={{
                  height: 'auto',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '& .MuiChip-label': {
                    color: action.color,
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.85,
                  },
                  '&:hover': {
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-disabled': { opacity: 0.3 },
                }}
              />
            ))}
          </Stack>

          <Box
            component="button"
            onClick={scrollToAbout}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1,
              borderRadius: '999px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'inherit',
              fontWeight: 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fafafa',
                background: 'rgba(255,255,255,0.04)',
              },
            }}
          >
            <ArrowDownwardIcon sx={{ fontSize: '0.9rem' }} />
            Explore my work
          </Box>
        </Box>
      </Box>

      {/* Turnstile */}
      {!hasToken && !turnstileError && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 1200,
            visibility: needsChallenge ? 'visible' : 'hidden',
            height: needsChallenge ? 'auto' : 0,
            overflow: 'hidden',
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

      {/* Chat Widget */}
      <ChatWidget
        open={chatOpen}
        onToggle={() => setChatOpen((prev) => !prev)}
        messages={messages}
        started={started}
        sendMessage={sendMessage}
        hasToken={hasToken}
        turnstileError={turnstileError}
      />
    </Box>
  );
};

export default Hero;
