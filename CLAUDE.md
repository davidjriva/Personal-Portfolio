# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `next-app/`:

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint via next lint
```

**Eval tests** (Python, from `next-app/tests/evals/`):
```bash
pip install pytest deepeval requests python-dotenv pyjwt
pytest test_chat_api_mock.py -v                      # Mock tests (no API cost)
pytest test_chat_api.py -v                           # Live integration tests
pytest test_chat_api.py -v --refresh-cache           # Force re-fetch (bypass cache)
```

## Architecture

### Repository Layout

```
next-app/
├── src/
│   ├── app/
│   │   ├── api/          # Route handlers (chat, token, contact, health)
│   │   ├── chat/         # /chat page
│   │   └── page.js       # Home page (single scrolling page)
│   ├── components/       # React components, co-located by section
│   ├── lib/
│   │   ├── chatConfig.ts # System prompt + OpenAI tool definitions
│   │   └── search.ts     # Embedding-based cosine similarity search
│   └── theme.js          # MUI dark theme (cyan #38c0f2, purple #6e40c9)
├── public/
│   ├── data/             # JSON data files (experiences, projects, skills, awards)
│   └── embeddings/       # Pre-computed OpenAI embeddings for RAG search
└── tests/evals/          # Python DeepEval test suite
```

### AI Chat Agent

The `/api/chat` route implements an agentic loop:
1. Receives user message with JWT auth
2. Runs tool-calling loop — model calls `search_resume_data` as needed
3. Search executes cosine similarity against pre-computed embeddings in `public/embeddings/`
4. Results fed back to model; loop continues until final text response
5. Streams response as SSE

**Embeddings:** Pre-computed with `text-embedding-3-large`, stored as JSON in `public/embeddings/`. Chat model is `gpt-4o-mini`; eval model is `gpt-4o`. To update embeddings after changing data files, re-run the embedding generation script.

**Session memory:** In-memory `Map` keyed by session ID, capped at 3 message pairs (6 messages).

**Rate limiting:** Upstash Redis — 20 requests/min per IP/session.

### Auth & Security Flow

Chat requests require a short-lived JWT (5-min TTL):
1. User completes Cloudflare Turnstile CAPTCHA on `/chat`
2. Frontend POSTs CAPTCHA token to `/api/token` → validated with Cloudflare → JWT issued
3. JWT sent as `Authorization: Bearer <token>` on all `/api/chat` requests
4. Origin validation enforces `davidriva.dev` in production, `VERCEL_URL` in preview

### Home Page

Single scrolling page (`page.js`) with sections: Greeting → About → Projects → Contact. Each section is lazy-loaded with `dynamic()` except `ParticleBackground` and `NavBar` (statically imported for faster load).

**ParticleBackground:** `initParticlesEngine` runs at module load (not inside `useEffect`) so the engine is ready before the component mounts. Pass `backgroundColor="transparent"` to let the parent CSS gradient show through.

### Eval Framework

Tests in `tests/evals/` use DeepEval + response caching:
- `golden_dataset.json` — ground-truth test cases
- `response_cache.json` — SHA256-keyed cache to avoid redundant API calls
- Live tests send `x-eval-mode: true` header; the API returns `[EVAL_CONTEXTS]` metadata in the stream for faithfulness scoring

## Key Conventions

- **Styling:** MUI `sx` prop only — no CSS modules or Tailwind. Inline `@keyframes` declared inside `sx`. Dark theme only.
- **Path alias:** `@/` maps to `src/`.
- **`'use client'`** required on any component using hooks, browser APIs, or event handlers.
- **Data:** Section content (experiences, projects, skills, awards) lives in `public/data/*.json` and is fetched client-side or used to generate embeddings.
- **Formatting:** Prettier — 120 char width, single quotes, trailing commas (ES5).
