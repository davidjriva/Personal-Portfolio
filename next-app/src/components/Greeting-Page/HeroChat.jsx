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
  'What AI have you built?': `## AI Projects & Work

**This portfolio agent** — an agentic RAG system built with Next.js, GPT-4o-mini, and OpenAI embeddings. It uses cosine similarity search over pre-computed embeddings to retrieve relevant context from my resume, then streams responses via SSE. Rate-limited via Upstash Redis and protected by Cloudflare Turnstile.

**C3 Agentic AI Hackathon (2025) — 1st place** — built agentic tooling using React, TypeScript, and C3 AI's in-house LLM that significantly boosted developer efficiency in UI component creation.

**Machine Learning models:**
- **Plant Disease Classifier** — fine-tuned a pre-trained CNN (ImageNet) using TensorFlow, Keras, and PySpark to classify plant diseases from leaf images
- **Playing Card Classifier** — custom CNN trained to recognize all 52 playing cards with high accuracy

I also work daily with C3 AI's enterprise ML platform, training 8,000+ learners on data science, ML pipelines, and application development.`,

  'Tell me about your experience': `## Experience

**Technical Trainer (Forward Deployed Engineer) — C3 AI** *(Sept 2024 – Present)*
Redwood City, CA
- 🏆 1st place, C3 Agentic AI Hackathon 2025
- Core training platform serving 8,000+ learners globally
- Built internal automation tools (React, Next.js, Electron.js) cutting learner feedback time by 80%
- Curriculum development in data science, ML, and application development

**Full-Stack Developer, University Research — Colorado State University** *(Dec 2022 – Jan 2024)*
- Urban Sustain Project: accessible interface to 20TB+ datasets for social & environmental researchers
- Built geospatial visualizations with React, TypeScript, Python/Flask, and MongoDB
- 🏆 Excellence in Data Science Award, CSU Celebrating Undergraduate Research

**Machine Learning Engineer Intern — Hewlett Packard Inc.** *(May – Aug 2023)*
Vancouver, WA
- Built 3 ETL pipelines (AWS S3 → Redshift) and developed ML forecasting models with Scikit-Learn & Facebook Prophet

**Teaching Assistant — Colorado State University** *(Aug – Dec 2022)*
- CS-165 Data Structures & Algorithms, 30 students

🎓 B.S. Computer Science, Colorado State University — *Summa Cum Laude, May 2024*`,

  'Featured projects': `## Featured Projects

**[Email Templating Utility Tool](https://github.com/davidjriva/Email-Sender-Util)** *(Oct 2024)*
A Next.js + Electron.js app that generates pre-written emails in Outlook from a form. Uses inter-process communication and AppleScript to launch Outlook directly — reduced feedback turnaround at C3 AI by 80%.

**[Nature Nomads](https://github.com/davidjriva/Nature-Nomads)** *(Jul – Aug 2024)*
Full-stack e-commerce platform for booking guided nature tours. Stripe payments, user profiles, tour browsing — built with Node.js, Express, MongoDB, and JavaScript.

**[Trip Planning Application](https://github.com/davidjriva/Trip-Planner)** *(Aug – Dec 2023)*
Collaborative full-stack trip optimization app built with React, Java, SQL (MariaDB), and multiple RESTful APIs. Followed Agile/Scrum with a team of 5.`,
};

const CHIPS = [
  {
    label: 'What AI have you built?',
    bg: 'rgba(56,192,242,0.14)',
    border: 'rgba(56,192,242,0.55)',
    color: '#38c0f2',
    hoverBg: 'rgba(56,192,242,0.26)',
    hoverBorder: 'rgba(56,192,242,0.9)',
    glow: '0 0 14px rgba(56,192,242,0.35)',
  },
  {
    label: 'Tell me about your experience',
    bg: 'rgba(110,64,201,0.14)',
    border: 'rgba(110,64,201,0.55)',
    color: '#b894ff',
    hoverBg: 'rgba(110,64,201,0.28)',
    hoverBorder: 'rgba(110,64,201,0.9)',
    glow: '0 0 14px rgba(110,64,201,0.35)',
  },
  {
    label: 'Featured projects',
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
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={turnstileError ? 'Verification failed' : !hasToken ? 'Verifying...' : 'Ask anything…'}
          />
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
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={handleSend}
            disabled={!hasToken}
            placeholder={!hasToken ? 'Verifying...' : 'Ask anything…'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroChat;
