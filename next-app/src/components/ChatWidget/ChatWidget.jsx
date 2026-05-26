'use client';

import { useState } from 'react';
import { Box, Typography, Fab, Drawer, IconButton } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { Turnstile } from '@marsidev/react-turnstile';
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

const QUICK_PROMPTS = [
  { label: 'What AI have you built?' },
  { label: 'Tell me about your experience' },
  { label: 'Featured projects' },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const { messages, started, sendMessage, addCachedExchange, fetchToken, hasToken } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <Fab
        onClick={() => setOpen(true)}
        aria-label="Chat with AI"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1200,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          width: 56,
          height: 56,
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
          display: open ? 'none' : 'flex',
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* Chat drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            bgcolor: '#0c0c12',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2.5,
              py: 2,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SmartToyIcon sx={{ fontSize: '1.2rem', color: '#fff' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#ededf0' }}>
                David&apos;s AI Agent
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#7a7a8e' }}>
                Ask about experience, projects & skills
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#7a7a8e' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages or welcome */}
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {!started ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  px: 3,
                  gap: 3,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 1, color: '#ededf0' }}>
                    Hi! Ask me anything about David.
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#7a7a8e' }}>
                    I can tell you about his experience, projects, skills, and more.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                  {QUICK_PROMPTS.map((qp) => (
                    <Box
                      key={qp.label}
                      component="button"
                      disabled={!hasToken}
                      onClick={() => {
                        const cached = CHIP_CACHE[qp.label];
                        if (cached) addCachedExchange(qp.label, cached);
                        else sendMessage(qp.label);
                      }}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1.5,
                        color: '#ededf0',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        cursor: hasToken ? 'pointer' : 'default',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        '&:hover:not(:disabled)': {
                          bgcolor: 'rgba(99, 102, 241, 0.06)',
                          borderColor: 'rgba(99, 102, 241, 0.2)',
                        },
                        '&:disabled': { opacity: 0.4 },
                      }}
                    >
                      {qp.label}
                    </Box>
                  ))}
                </Box>

                {/* Turnstile */}
                {!hasToken && !turnstileError && (
                  <Box
                    sx={{
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

                {turnstileError && (
                  <Typography sx={{ fontSize: '0.8rem', color: '#f87171' }}>
                    Verification failed — chat unavailable.
                  </Typography>
                )}
              </Box>
            ) : (
              <Box sx={{ height: '100%', px: 1, pt: 1 }}>
                <MessagesList messages={messages} />
              </Box>
            )}
          </Box>

          {/* Input */}
          <Box
            sx={{
              flexShrink: 0,
              px: 2,
              py: 1.5,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              bgcolor: 'rgba(0,0,0,0.2)',
            }}
          >
            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={handleSend}
              disabled={!hasToken}
              placeholder={turnstileError ? 'Chat unavailable' : !hasToken ? 'Verifying...' : 'Ask anything...'}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatWidget;
