# Portfolio Redesign — Design Spec
**Date:** 2026-04-17  
**Branch:** dr/create-agent-eval-framework-and-tests  
**Scope:** Visual redesign only — no content changes, no new sections

---

## Summary

Redesign the personal portfolio (`next-app`) with a glass/gradient dark aesthetic. The goal is a cleaner, more modern look using deep purple/navy gradients, frosted glass cards, and cyan (`#38c0f2`) + purple (`#6e40c9`) accents. All section content stays the same. Light mode is removed in favor of a dark-only experience.

---

## Decisions

| Topic | Decision |
|---|---|
| Aesthetic | Glass / Gradient |
| Mode | Dark-only (remove light mode toggle + `ColorModeContext`) |
| Sections | Hero → About → Projects → Contact (Skills + Awards untouched) |
| Hero background | Animated CSS gradient + existing tsparticles |
| Approach | Targeted overhaul: new theme system + redesigned Hero, About, ProjectCard; Contact + Navbar get theme upgrade only |

---

## Color System

| Token | Value | Usage |
|---|---|---|
| Background base | `#0b0920` | Page background |
| Background hero | `linear-gradient(135deg, #0f0c29, #302b63, #0d1b2a, #1a0a2e)` | Hero section |
| Background section-alt | `#12102a` | About section |
| Background section-deep | `#0e0c22` | Projects section |
| Accent cyan | `#38c0f2` | Primary accent, links, active nav, headings |
| Accent purple | `#6e40c9` | Secondary accent, gradient pairings |
| Glass surface | `rgba(255, 255, 255, 0.04)` | Card/panel backgrounds |
| Glass border | `rgba(255, 255, 255, 0.09)` | Card borders |
| Glass border cyan | `rgba(56, 192, 242, 0.15)` | Highlighted card borders |
| Text primary | `#ffffff` | Headings, labels |
| Text secondary | `rgba(255, 255, 255, 0.55)` | Body text, subtitles |
| Text muted | `rgba(255, 255, 255, 0.35)` | Captions, dates |

---

## Component Designs

### Global Theme (`theme.js`)
- Remove the dynamic `createTheme` / `ColorModeContext` setup
- Replace with a single static dark MUI theme using the color tokens above
- Font: Montserrat (unchanged)
- Remove all light-mode conditional styling across components

### Navbar (`NavBar.js`)
- Background: `rgba(10, 8, 28, 0.75)` + `backdrop-filter: blur(16px)`
- Bottom border: `1px solid rgba(56, 192, 242, 0.15)`
- Active nav link: cyan color + `border-bottom: 1.5px solid #38c0f2`
- Remove dark/light toggle `IconButton` entirely
- Remove `Brightness4Icon` / `Brightness7Icon` imports

### Hero (`Greeting.jsx`)
- Background: animated CSS gradient (`gradShift` keyframe, 8s cycle) behind the existing `<ParticleBackground />`
- The `ParticleBackground` component keeps its current logic; its `backgroundColor` prop receives `#0f0c29` (no more conditional)
- "Hello, I'm" label: glass pill — `rgba(56,192,242,0.08)` background, `1px solid rgba(56,192,242,0.25)` border, `border-radius: 20px`
- Name: `font-size: clamp(2rem, 6vw, 3.5rem)`, `font-weight: 900`, "David" white, "Riva" in `#38c0f2`
- CTA buttons: replace `StyledButton` with glassmorphic pill buttons — cyan-tinted (`rgba(56,192,242,0.12)` bg, `rgba(56,192,242,0.45)` border) for "View my work", purple-tinted (`rgba(110,64,201,0.15)` bg, `rgba(110,64,201,0.4)` border) for "Chat with my agent"
- Name heading: `font-weight: 900`, "David" white, "Riva" in `#38c0f2` (existing color, just bump weight)
- Remove particle background color conditional (dark mode only now)

### About (`About.js`, `AboutHeader.js`, `Biography.js`)
- Headshot: wrap in a `2px` gradient ring (`linear-gradient(135deg, #38c0f2, #6e40c9)`)
- Bio content: wrap `AboutTextSection` in a frosted glass panel (`rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.09)` border, `border-radius: 16px`, `backdrop-filter: blur(12px)`)
- `AboutHeader` role color stays `#38c0f2`; underline decoration removed (cleaner in glass context)
- `SimpleTimeline` — keep as-is structurally, update colors to match dark theme
- Section background: `linear-gradient(180deg, #12102a 0%, #0e0c22 100%)`

### ProjectCard (`ProjectCard.js`)
- Card background: `rgba(255, 255, 255, 0.04)`
- Card border: `1px solid rgba(56, 192, 242, 0.15)` (uniform cyan tint across all cards)
- On hover: border brightens to `rgba(56, 192, 242, 0.4)`, subtle box-shadow glow `0 0 20px rgba(56, 192, 242, 0.12)`
- Tech chips: `rgba(56, 192, 242, 0.08)` background, `rgba(56, 192, 242, 0.2)` border, cyan text
- "View Project" button: outlined cyan, `border-radius: 8px` (unchanged shape, updated colors)
- Image overlay gradient: `rgba(15, 12, 41, 0.6)` at bottom (deeper, more on-brand)
- Section background: `#0b0920`

### Contact (`Contact.js`, `ContactForm.js`)
- Section background: `linear-gradient(180deg, #0e0c22 0%, #0a0818 100%)`
- Form inputs: glass treatment — `rgba(255,255,255,0.05)` background, `rgba(255,255,255,0.1)` border, white text
- Submit button: gradient fill `linear-gradient(135deg, #38c0f2, #6e40c9)`, white text, `border-radius: 8px`

### Footer (`Footer.js`)
- Background: `#060514`
- Text: `rgba(255,255,255,0.35)`
- Accent links: `#38c0f2`

### `page.js`
- Remove all `theme.palette.mode` conditionals
- Replace hardcoded section background hex values with the tokens above
- Remove `ParticleBackground` `backgroundColor` conditional

---

## Files Changed

| File | Change type |
|---|---|
| `src/theme.js` | Full rewrite — static dark theme |
| `src/contexts/ColorModeContext.js` | Delete (no longer needed) |
| `src/app/layout.js` | Remove ColorModeContext provider |
| `src/app/page.js` | Remove mode conditionals, update section backgrounds |
| `src/components/Navbar/NavBar.js` | Remove toggle, glass styling |
| `src/components/Greeting-Page/Greeting.jsx` | Animated gradient bg, glass CTA pills |
| `src/components/ParticleBackground.js` | Remove color conditional |
| `src/components/About-Page/About.js` | Glass panel wrapper, gradient headshot ring |
| `src/components/About-Page/AboutHeader.js` | Remove underline, update colors |
| `src/components/Projects-Page/ProjectCard.js` | Glass card styling, chip colors, hover glow |
| `src/components/Contact-Page/ContactForm.js` | Glass inputs, gradient submit button |
| `src/components/Footer/Footer.js` | Dark theme colors |

---

## Implementation Process

- All implementation work is done in a **git worktree** on a feature branch (never directly on `main`)
- Each logical chunk of work (e.g., theme system, Hero, About, ProjectCard) gets its own **pull request** against `main`
- Nothing is merged to `main` directly — all changes go through PRs

---

## Out of Scope

- No content changes (bio text, project data, contact form logic)
- Skills and Awards sections untouched
- Chat page (`/chat`) untouched
- No new sections or layout restructuring beyond what's specified above
- No animation library changes (GSAP, tsparticles stay as-is)
