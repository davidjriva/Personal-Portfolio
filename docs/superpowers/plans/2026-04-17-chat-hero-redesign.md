# Chat Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the AI chat from `/chat` into the hero section, replacing `Greeting.jsx` with `HeroChat.jsx` that owns pre-chat and chat-active views with a CSS crossfade transition.

**Architecture:** `HeroChat.jsx` owns `input` state and delegates streaming/auth to the existing `useChat` hook (untouched). Both views are `position: absolute, inset: 0` inside the 100vh hero so height never shifts during transition. `ChatInput`, `MessageItem`, and `MessagesList` receive visual-only restyling. Old `/chat` route and `ChatContainer.jsx` are deleted.

**Tech Stack:** React, MUI (`sx` prop only), `useChat` hook, `@marsidev/react-turnstile`, CSS transitions

---

## File Map

| Action | Path |
|--------|------|
| Create | `next-app/src/components/Greeting-Page/HeroChat.jsx` |
| Modify | `next-app/src/components/Chat-Page/ChatInput.jsx` |
| Modify | `next-app/src/components/Chat-Page/MessageItem.jsx` |
| Modify | `next-app/src/components/Chat-Page/MessagesList.jsx` |
| Modify | `next-app/src/app/page.js` |
| Delete | `next-app/src/app/chat/page.js` |
| Delete | `next-app/src/components/Chat-Page/ChatContainer.jsx` |
| Delete | `next-app/src/components/Greeting-Page/Greeting.jsx` |
| Keep   | `next-app/src/components/Chat-Page/hooks/useChat.js` |
| Keep   | `next-app/src/components/Chat-Page/BouncingDotsLoadingAnimation.jsx` |
| Keep   | `next-app/src/components/Greeting-Page/AnimatedTypingTypography.js` |

---

### Task 1: Restyle ChatInput.jsx

**Files:**
- Modify: `next-app/src/components/Chat-Page/ChatInput.jsx`

Replace the dark-grey Paper with a cyan glass pill. Props unchanged (`input`, `setInput`, `sendMessage`, `disabled`).

- [ ] **Step 1: Replace the component**

Write the full file:

```jsx
import { InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ input, setInput, sendMessage, disabled = false }) => {
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: '4px 8px',
        borderRadius: '999px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(56,192,242,0.3)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        '&:hover': { borderColor: 'rgba(56,192,242,0.6)' },
        '&:focus-within': { borderColor: '#38c0f2' },
      }}
    >
      <InputBase
        placeholder="Ask anything…"
        value={input}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }}
        sx={{
          ml: 1,
          flex: 1,
          color: '#fff',
          fontFamily: 'var(--font-montserrat), Arial, sans-serif',
          '& input::placeholder': { color: 'rgba(255,255,255,0.35)' },
        }}
      />
      <IconButton
        type="submit"
        disabled={!input.trim() || disabled}
        sx={{
          ml: 1,
          background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
          '&:hover': { opacity: 0.85 },
          '&.Mui-disabled': { background: 'rgba(255,255,255,0.08)' },
        }}
      >
        <SendIcon sx={{ color: '#fff', fontSize: '1.1rem' }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
```

- [ ] **Step 2: Start the dev server and verify visually**

```bash
cd next-app && npm run dev
```

Open http://localhost:3000. The hero input should now show as a translucent pill with a cyan glow on focus and a gradient send button. The existing `/chat` page at http://localhost:3000/chat should also reflect the new input style.

- [ ] **Step 3: Commit**

```bash
git add next-app/src/components/Chat-Page/ChatInput.jsx
git commit -m "feat: restyle ChatInput to cyan glass pill"
```

---

### Task 2: Restyle MessageItem.jsx

**Files:**
- Modify: `next-app/src/components/Chat-Page/MessageItem.jsx`

Replace flat grey blocks with directional chat bubbles. User messages right-align with a cyan tint; assistant messages left-align with a glass tint. The role label (`you:` / `assistant:`) is removed — alignment alone communicates direction.

- [ ] **Step 1: Replace the component**

```jsx
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import BouncingDotsLoadingAnimation from '@/components/Chat-Page/BouncingDotsLoadingAnimation';

const MessageItem = ({ msg }) => {
  const isUser = msg.role === 'user';
  const showDots = msg.role === 'assistant' && (!msg.text || msg.text.length === 0);

  const mdStyles = {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: '0.95rem',
    color: '#fff',
    marginBottom: '4px',
  };

  return (
    <Box
      sx={{
        mb: 1.5,
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          px: 2,
          py: 1,
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? 'rgba(56,192,242,0.12)' : 'rgba(255,255,255,0.05)',
          border: isUser
            ? '1px solid rgba(56,192,242,0.22)'
            : '1px solid rgba(255,255,255,0.09)',
        }}
      >
        {msg.role === 'assistant' ? (
          showDots ? (
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
              <BouncingDotsLoadingAnimation dotSize={8} dotColor="#38c0f2" spacing={4} />
            </Box>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <Typography sx={mdStyles} {...props} />,
                li: ({ node, ...props }) => <li style={{ ...mdStyles, marginBottom: '6px' }} {...props} />,
                strong: ({ node, ...props }) => <strong style={{ ...mdStyles, fontWeight: 700 }} {...props} />,
                em: ({ node, ...props }) => <em style={mdStyles} {...props} />,
                h1: ({ node, ...props }) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.4rem', mt: 2, mb: 1 }} {...props} />,
                h2: ({ node, ...props }) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.2rem', mt: 1.5, mb: 0.8 }} {...props} />,
                h3: ({ node, ...props }) => <Typography sx={{ ...mdStyles, fontWeight: 700, fontSize: '1.05rem', mt: 1.2, mb: 0.6 }} {...props} />,
                code: ({ node, inline, ...props }) => (
                  <Box
                    component="code"
                    sx={{
                      fontFamily: 'monospace',
                      color: '#38c0f2',
                      backgroundColor: 'rgba(56,192,242,0.08)',
                      p: inline ? '0 4px' : 1,
                      borderRadius: 1,
                      display: inline ? 'inline' : 'block',
                      overflowX: 'auto',
                    }}
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <Box
                    component="pre"
                    sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', p: 1, borderRadius: 1, overflowX: 'auto' }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => <a style={{ color: '#38c0f2', textDecoration: 'none' }} {...props} />,
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )
        ) : (
          <Typography sx={{ ...mdStyles, color: '#fff' }}>{msg.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
```

- [ ] **Step 2: Verify on dev server**

Navigate to http://localhost:3000/chat and send a message. User messages should appear right-aligned with a cyan border. The assistant's typing indicator (bouncing dots) should appear while streaming, replaced by the response in a left-aligned glass bubble.

- [ ] **Step 3: Commit**

```bash
git add next-app/src/components/Chat-Page/MessageItem.jsx
git commit -m "feat: restyle MessageItem to directional chat bubbles"
```

---

### Task 3: Update MessagesList.jsx

**Files:**
- Modify: `next-app/src/components/Chat-Page/MessagesList.jsx`

Remove the Paper wrapper (HeroChat controls the container). Add a `ref` for auto-scroll to latest message on every update. The component now fills whatever height its parent gives it.

- [ ] **Step 1: Replace the component**

```jsx
import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import MessageItem from '@/components/Chat-Page/MessageItem';

const MessagesList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      {messages.map((msg, i) => (
        <MessageItem key={i} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessagesList;
```

- [ ] **Step 2: Verify auto-scroll on dev server**

Navigate to http://localhost:3000/chat, send several messages until the list overflows. The view should scroll to the latest message automatically on each new reply.

- [ ] **Step 3: Commit**

```bash
git add next-app/src/components/Chat-Page/MessagesList.jsx
git commit -m "feat: update MessagesList — auto-scroll ref, remove Paper wrapper"
```

---

### Task 4: Create HeroChat.jsx

**Files:**
- Create: `next-app/src/components/Greeting-Page/HeroChat.jsx`

New hero component. Two views — pre-chat and chat-active — are both rendered as `position: absolute, inset: 0` inside the hero's `100vh` container. CSS transitions crossfade them on `started` flip.

`sendMessage` from `useChat` accepts a string directly, so chips call it without routing through the input field. The Turnstile widget is always mounted; once verified it is hidden via `display: none` on its wrapper so it doesn't unmount mid-session.

- [ ] **Step 1: Create the file**

```jsx
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
    bg: 'rgba(56,192,242,0.08)',
    border: 'rgba(56,192,242,0.22)',
    color: '#38c0f2',
  },
  {
    label: '💼 Tell me about your experience',
    bg: 'rgba(110,64,201,0.08)',
    border: 'rgba(110,64,201,0.22)',
    color: '#a680ff',
  },
  {
    label: '🚀 Featured projects',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.5)',
  },
];

const HeroChat = () => {
  const [input, setInput] = useState('');
  const { messages, started, sendMessage, fetchToken, hasToken } = useChat();

  const scrollToAbout = () => {
    const section = document.getElementById('about');
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
          <span style={{ color: '#ffffff' }}>Hello, I'm </span>
          <span style={{ color: '#38c0f2' }}>David</span>
        </Typography>

        <AnimatedTypingTypography />

        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <ChatInput input={input} setInput={setInput} sendMessage={handleSend} disabled={!hasToken} />
        </Box>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)', minHeight: '1.2em' }}>
          {!hasToken ? 'Verifying…' : ''}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          {CHIPS.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              disabled={!hasToken}
              onClick={() => sendMessage(chip.label)}
              sx={{
                background: chip.bg,
                border: `1px solid ${chip.border}`,
                color: chip.color,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.82rem',
                cursor: 'pointer',
                '& .MuiChip-label': { color: chip.color },
                '&:hover': { opacity: 0.85 },
                '&.Mui-disabled': { opacity: 0.4 },
              }}
            />
          ))}
        </Stack>

        {/* Turnstile — always mounted, hidden once verified */}
        <Box sx={{ display: hasToken ? 'none' : 'flex', justifyContent: 'center' }}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
            onSuccess={(captchaToken) => fetchToken(captchaToken)}
          />
        </Box>

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
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': { borderColor: 'rgba(255,255,255,0.5)', color: '#fff' },
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
              David's AI Agent
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
              Knows David's experience, projects &amp; skills
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            ↓ scroll for portfolio
          </Typography>
        </Box>

        {/* Messages list */}
        <Box sx={{ flex: 1, overflow: 'hidden', px: 2, pt: 1 }}>
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
```

- [ ] **Step 2: Verify file was created**

```bash
ls next-app/src/components/Greeting-Page/HeroChat.jsx
```

Expected: file exists. (Page still shows `Greeting` — that swap is Task 5.)

- [ ] **Step 3: Commit**

```bash
git add next-app/src/components/Greeting-Page/HeroChat.jsx
git commit -m "feat: create HeroChat — embedded chat hero with pre/chat-active states"
```

---

### Task 5: Update page.js — swap Greeting → HeroChat

**Files:**
- Modify: `next-app/src/app/page.js`

One import swapped. The animated gradient background wrapper in `page.js` stays — `HeroChat` renders inside it exactly as `Greeting` did.

- [ ] **Step 1: Update the import**

In `next-app/src/app/page.js`, change:

```js
const Greeting = dynamic(() => import('@/components/Greeting-Page/Greeting'), { ssr: false });
```

to:

```js
const HeroChat = dynamic(() => import('@/components/Greeting-Page/HeroChat'), { ssr: false });
```

- [ ] **Step 2: Update the JSX usage**

In the same file, change the render from:

```jsx
<Greeting />
```

to:

```jsx
<HeroChat />
```

- [ ] **Step 3: Verify on dev server**

Open http://localhost:3000. The hero should show the new pre-chat view: "Hello, I'm David" heading, animated typing subtitle, glass input, suggestion chips, and "View my work" ghost button at the bottom. The Turnstile widget should appear below the chips until verification completes, then hide. After verification, click a chip — the hero should crossfade to the chat-active view with agent header, messages, and input bar.

- [ ] **Step 4: Commit**

```bash
git add next-app/src/app/page.js
git commit -m "feat: swap Greeting for HeroChat in page.js"
```

---

### Task 6: Delete obsolete files

**Files:**
- Delete: `next-app/src/app/chat/page.js`
- Delete: `next-app/src/components/Chat-Page/ChatContainer.jsx`
- Delete: `next-app/src/components/Greeting-Page/Greeting.jsx`

`page.js` no longer imports `Greeting`. Nothing imports `ChatContainer` or `src/app/chat/page.js` — safe to delete.

- [ ] **Step 1: Delete the files**

```bash
rm next-app/src/app/chat/page.js
rm next-app/src/components/Chat-Page/ChatContainer.jsx
rm next-app/src/components/Greeting-Page/Greeting.jsx
```

- [ ] **Step 2: Verify build passes**

```bash
cd next-app && npm run build
```

Expected: build completes without errors. Any `Module not found` error means a stray import still references one of the deleted files — fix it before proceeding.

- [ ] **Step 3: Verify routing**

Navigate to http://localhost:3000/chat — Next.js should return a 404 (the route is gone). Navigate to http://localhost:3000 — hero should work as before.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete /chat route, ChatContainer, and Greeting — replaced by HeroChat"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| HeroChat owns `input` + `started`, uses `useChat` | Task 4 |
| Pre-chat: heading, animated subtitle, input, verification hint, chips, Turnstile, scroll CTA | Task 4 |
| Chip styling: cyan / purple / neutral | Task 4 |
| Turnstile always mounted, hidden post-verify | Task 4 |
| Chat-active: agent header, messages list, sticky input bar | Task 4 |
| Agent header layout (avatar, title, subtitle, scroll hint) | Task 4 |
| Crossfade transition 300ms, pre-chat -10px translateY | Task 4 |
| ChatInput glass pill with cyan border + gradient send button | Task 1 |
| MessageItem directional bubbles, typing dots | Task 2 |
| MessagesList auto-scroll ref | Task 3 |
| page.js swap | Task 5 |
| Delete `/chat`, `ChatContainer`, `Greeting` | Task 6 |
| `useChat` and `BouncingDotsLoadingAnimation` kept unchanged | Confirmed — not touched |

**Chip onClick sends message correctly:** `sendMessage(chip.label)` — `useChat.sendMessage` accepts a string directly; this matches the existing signature at `useChat.js:30`.

**`MessagesList` height contract:** `HeroChat` gives it `flex: 1, overflow: hidden`; `MessagesList` applies `height: 100%, overflowY: auto` — scroll is contained inside the hero.

**Turnstile in pre-chat only:** The Turnstile is inside the pre-chat `Box`. Once `started` becomes `true`, that Box gets `pointerEvents: none` and `opacity: 0`. The widget is hidden by its wrapper's `display: none` after `hasToken` — it doesn't need to be in the chat-active view.
