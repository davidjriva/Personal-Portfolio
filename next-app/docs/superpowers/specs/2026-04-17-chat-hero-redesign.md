# Chat Hero Redesign — Design Spec

## Goal

Move the AI chat from a separate `/chat` route into the hero section of the landing page, making it a core feature that visitors encounter immediately. The `/chat` route is removed.

## Architecture

The existing `Greeting.jsx` component is replaced by `HeroChat.jsx`, which owns two mutually exclusive states: the pre-chat greeting and the active chat view. The `useChat.js` hook is reused without modification. `ChatContainer.jsx` is deprecated. `ChatInput.jsx`, `MessageItem.jsx`, and `MessagesList.jsx` are restyled in place.

**Tech stack:** React, MUI (`sx` prop only), `useChat` hook, `@marsidev/react-turnstile`, `gsap` for transition animation.

---

## Component Structure

### `HeroChat.jsx` (replaces `Greeting.jsx`)

Central component rendered in `page.js` in place of `Greeting`. Owns:
- `input` state (current text field value)
- `started` state from `useChat` (drives which view is shown)
- Turnstile token flow via `fetchToken` / `hasToken` from `useChat`

Renders two views, switching on `started`:
1. **Pre-chat view** — greeting + chat input + suggested chips
2. **Chat-active view** — compact agent header + messages list + sticky input

### `ChatInput.jsx` (restyled)

Pill-shaped input with a cyan-glowing border. Props unchanged (`input`, `setInput`, `sendMessage`, `disabled`). Styling updated to match portfolio dark theme — replaces the current `#2c2c2c` background.

### `MessageItem.jsx` (restyled)

Bubble layout replacing flat grey blocks:
- **User messages**: right-aligned, `rgba(56,192,242,0.12)` background, `1px solid rgba(56,192,242,0.22)` border, `border-radius: 16px 16px 4px 16px`
- **Assistant messages**: left-aligned, `rgba(255,255,255,0.05)` background, `1px solid rgba(255,255,255,0.09)` border, `border-radius: 16px 16px 16px 4px`
- Typing indicator: 3 bouncing cyan dots (shown when `msg.typing && msg.text.length === 0`)

### `MessagesList.jsx` (minor update)

Scrollable messages list within the hero viewport. Adds `ref` for auto-scroll to bottom on new messages.

---

## Pre-Chat Hero State

Rendered when `started === false`.

**Layout** (centered in 100vh, flex column, gap 16px):

1. **Heading**: "Hello, I'm **David**" — identical to current `Greeting.jsx`, `clamp(2rem, 6vw, 3.5rem)`, weight 900
2. **Animated typing subtitle**: `AnimatedTypingTypography` — reused unchanged
3. **Chat input**: `ChatInput` (restyled), full-width up to `500px`, `disabled={!hasToken}`
4. **Verification hint**: Below input — `Typography variant="caption"` in `rgba(255,255,255,0.25)`. Shows "Verifying…" while `!hasToken`, disappears once verified.
5. **Suggested prompt chips**: Row of 3 `Chip` components. `disabled` when `!hasToken`. Clicking a chip calls `sendMessage(chipText)` directly.
   - "🤖 What AI have you built?" — cyan tint (`rgba(56,192,242,0.08)`, border `rgba(56,192,242,0.22)`, color `#38c0f2`)
   - "💼 Tell me about your experience" — purple tint (`rgba(110,64,201,0.08)`, border `rgba(110,64,201,0.22)`, color `#a680ff`)
   - "🚀 Featured projects" — neutral (`rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.12)`, color `rgba(255,255,255,0.5)`)
6. **Scroll CTA**: Ghost button "View my work ↓" at the bottom of the hero — `onClick` scrolls to `#about` (reused from current `Greeting.jsx`)

**Turnstile placement**: `<Turnstile>` renders as a visible widget immediately on mount, centered below the chips. Once `onSuccess` fires and `hasToken` becomes true, the widget is hidden with `display: 'none'`. Input and chips stay `disabled` until `hasToken` is true.

---

## Chat-Active Hero State

Rendered when `started === true`. The hero remains `100vh`, `display: flex`, `flexDirection: column`.

**Layout (top to bottom, full height):**

1. **Agent header** (`flex-shrink: 0`, ~56px tall):
   - Gradient avatar circle (D initial, `linear-gradient(135deg, #38c0f2, #6e40c9)`)
   - "David's AI Agent" label, weight 800
   - Subtitle: "Knows David's experience, projects & skills" in `rgba(255,255,255,0.35)`
   - Right side: "↓ scroll for portfolio" hint in `rgba(255,255,255,0.3)`, `font-size: 0.75rem`
   - Bottom border: `1px solid rgba(255,255,255,0.07)`

2. **Messages list** (`flex: 1`, `overflow-y: auto`):
   - `MessagesList` with redesigned `MessageItem` bubbles
   - Padding `16px`
   - Auto-scrolls to latest message

3. **Input bar** (`flex-shrink: 0`, ~60px tall):
   - `ChatInput` (restyled), `disabled={!hasToken}`
   - Top border: `1px solid rgba(255,255,255,0.07)`
   - Background: `rgba(0,0,0,0.2)`, `backdropFilter: blur(12px)`

---

## Transition Animation

Triggered when `started` flips from `false` to `true` (first message sent).

- Pre-chat content (heading, subtitle, chips, scroll CTA) fades out: `opacity: 0`, `transform: translateY(-10px)`, duration `300ms`, easing `ease-out`
- Agent header and messages list fade in: `opacity: 0 → 1`, duration `300ms`, `100ms` delay
- Hero container height stays fixed at `100vh` throughout — no layout shift
- Implementation: CSS transitions on a wrapper `Box` whose `opacity` and `transform` are driven by `started` state, or a lightweight GSAP `fromTo` matching existing patterns in the codebase

---

## Routing Changes

- Delete `src/app/chat/page.js`
- Delete `src/components/Chat-Page/ChatContainer.jsx` (logic absorbed into `HeroChat.jsx`)
- Update `src/app/page.js`: replace `Greeting` import with `HeroChat`
- The "Chat with my agent" `Link` in the old `Greeting.jsx` is removed (chat is now inline)
- The `StyledButton` back-button in the old chat page is removed

---

## Files Created / Modified

| Action | File |
|--------|------|
| Create | `src/components/Greeting-Page/HeroChat.jsx` |
| Modify | `src/components/Chat-Page/ChatInput.jsx` (restyle only) |
| Modify | `src/components/Chat-Page/MessageItem.jsx` (restyle only) |
| Modify | `src/components/Chat-Page/MessagesList.jsx` (add scroll ref) |
| Modify | `src/app/page.js` (swap Greeting → HeroChat import) |
| Delete | `src/app/chat/page.js` |
| Delete | `src/components/Chat-Page/ChatContainer.jsx` (logic absorbed into `HeroChat.jsx`) |
| Delete | `src/components/Greeting-Page/Greeting.jsx` (replaced by `HeroChat.jsx`) |
| Keep   | `src/components/Chat-Page/hooks/useChat.js` (no changes) |
| Keep   | `src/components/Chat-Page/BouncingDotsLoadingAnimation.jsx` (no changes) |

---

## Out of Scope

- API, auth, or rate-limiting changes
- Navbar changes
- Any section other than the hero
