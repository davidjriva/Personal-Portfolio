# Portfolio Glass/Gradient Redesign — Parallel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio with a glass/gradient dark aesthetic using a 2-phase strategy: orchestrator handles foundation (theme system), then 5 independent subagents execute component work in parallel.

**Architecture:** Phase 1 replaces `ColorModeContext` with a static dark `ThemeProvider` + `CssBaseline`. All `theme.palette.mode` conditionals in `page.js` become static values. Phase 2 dispatches 5 agents simultaneously — each owns non-overlapping files, so no merge conflicts are possible.

**Tech Stack:** Next.js 15, MUI v6, tsparticles, CSS `@keyframes`

---

## File Ownership Map

| Phase | Owner | Files |
|---|---|---|
| Phase 1 | Orchestrator | `src/theme.js`, `src/app/layout.js`, `src/app/page.js`, `src/contexts/ColorModeContext.js` (delete) |
| Phase 2 — Agent A | Subagent | `src/components/Navbar/NavBar.js`, `src/components/Footer/Footer.js` |
| Phase 2 — Agent B | Subagent | `src/components/Greeting-Page/Greeting.jsx`, `src/components/ParticleBackground.js` |
| Phase 2 — Agent C | Subagent | `src/components/About-Page/About.js`, `src/components/About-Page/AboutHeader.js` |
| Phase 2 — Agent D | Subagent | `src/components/Projects-Page/ProjectCard.js` |
| Phase 2 — Agent E | Subagent | `src/components/Contact-Page/ContactForm.js` |

---

## Color Token Reference (for all agents)

| Token | Value |
|---|---|
| Background base | `#0b0920` |
| Background hero gradient | `linear-gradient(135deg, #0f0c29, #302b63, #0d1b2a, #1a0a2e)` |
| Background about section | `linear-gradient(180deg, #12102a 0%, #0e0c22 100%)` |
| Background contact section | `linear-gradient(180deg, #0e0c22 0%, #0a0818 100%)` |
| Accent cyan | `#38c0f2` |
| Accent purple | `#6e40c9` |
| Glass surface | `rgba(255, 255, 255, 0.04)` |
| Glass border | `rgba(255, 255, 255, 0.09)` |
| Glass border cyan | `rgba(56, 192, 242, 0.15)` |
| Text primary | `#ffffff` |
| Text secondary | `rgba(255, 255, 255, 0.55)` |
| Text muted | `rgba(255, 255, 255, 0.35)` |
| Footer bg | `#060514` |
| Navbar bg | `rgba(10, 8, 28, 0.75)` |

---

## Phase 1 — Foundation (Orchestrator executes Tasks 1–2 before dispatching agents)

---

### Task 1: Rewrite Theme System

**Files:**
- Rewrite: `next-app/src/theme.js`
- Modify: `next-app/src/app/layout.js`
- Delete: `next-app/src/contexts/ColorModeContext.js`

- [ ] **Step 1: Rewrite `next-app/src/theme.js`**

```js
'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0920',
      paper: 'rgba(255, 255, 255, 0.04)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.55)',
    },
    primary: {
      main: '#38c0f2',
    },
    secondary: {
      main: '#6e40c9',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), Arial, sans-serif',
    h1: { fontWeight: 'bold', fontSize: '2.5rem' },
    h2: { fontWeight: 'bold' },
    h3: { fontWeight: 'bold' },
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: { fontWeight: 400, lineHeight: 1.6 },
    body2: { fontWeight: 400 },
  },
});

export default theme;
```

- [ ] **Step 2: Rewrite `next-app/src/app/layout.js`** — replace `ColorModeProvider` with `ThemeProvider`

```js
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'David Riva | Full Stack Software Engineer Portfolio',
  description: "Explore the portfolio of David Riva, a software engineer specializing in UI/UX, full-stack development, and data visualization. View projects involving React, Node.js, and Distributed Systems.",
  keywords: ["David Riva", "Software Engineer", "Full Stack Developer", "UI/UX Design", "React Developer", "Node.js", "Portfolio", "Web Development"],
  openGraph: {
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and big data visualization.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva Portfolio',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: "David Riva's headshot",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and data visualization.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Delete `next-app/src/contexts/ColorModeContext.js`**

```bash
cd next-app && git rm src/contexts/ColorModeContext.js
```

- [ ] **Step 4: Commit**

```bash
git add src/theme.js src/app/layout.js
git commit -m "feat: replace ColorModeContext with static dark MUI theme"
```

---

### Task 2: Clean Up page.js

**Files:**
- Modify: `next-app/src/app/page.js`

- [ ] **Step 1: Rewrite `next-app/src/app/page.js`** — remove `useTheme`, all `palette.mode` conditionals, apply static section backgrounds

```js
'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const Greeting = dynamic(() => import('@/components/Greeting-Page/Greeting'), { ssr: false });
const About = dynamic(() => import('@/components/About-Page/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects-Page/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact-Page/Contact'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills-Page/Skills'), { ssr: false });
const Awards = dynamic(() => import('@/components/Awards-Page/Awards'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });
import NavBar from '@/components/Navbar/NavBar';
import Footer from '@/components/Footer/Footer';

const MainPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0b0920',
        color: '#ffffff',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      <Box sx={{ position: 'relative', height: '100vh', bgcolor: 'transparent' }}>
        <ParticleBackground backgroundColor="#0f0c29" />
        <Greeting />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          id="about"
          sx={{
            background: 'linear-gradient(180deg, #12102a 0%, #0e0c22 100%)',
            width: '100%',
            color: '#ffffff',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <About />
        </Box>

        <Box
          id="projects"
          sx={{
            bgcolor: '#0b0920',
            width: '100%',
            color: '#ffffff',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Projects />
        </Box>

        <Box
          id="contact"
          sx={{
            background: 'linear-gradient(180deg, #0e0c22 0%, #0a0818 100%)',
            width: '100%',
            color: '#ffffff',
          }}
        >
          <Contact />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
export default MainPage;
```

- [ ] **Step 2: Verify no stale imports**

```bash
grep -n "useTheme\|ColorModeContext\|palette.mode" next-app/src/app/page.js
```
Expected: no matches.

- [ ] **Step 3: Commit**

```bash
cd next-app && git add src/app/page.js
git commit -m "feat: static section backgrounds in page.js, remove mode conditionals"
```

---

## Phase 2 — Dispatch All 5 Agents in Parallel

After Task 2 is committed, send **one message** with all 5 `Agent(...)` calls to dispatch them simultaneously. Each agent receives the self-contained prompt below.

---

### Task 3 — Agent A: NavBar + Footer

**Self-contained agent prompt:**

> You are implementing a glass/dark aesthetic redesign for a Next.js portfolio. Modify exactly 2 files in `/Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app/src/`. The theme system has already been updated to a static dark theme — there is no `ColorModeContext`, no `useColorMode`, no `toggleColorMode`. Do not import those. All mode conditionals are gone.
>
> Implement these files exactly as specified, then commit.

**Files:**
- Modify: `next-app/src/components/Navbar/NavBar.js`
- Modify: `next-app/src/components/Footer/Footer.js`

- [ ] **Step 1: Rewrite `NavBar.js`**

```js
'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import './ScrollLink.css';

const linkStyles = {
  margin: '0 16px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'Montserrat, Arial, sans-serif',
  transition: 'all 0.3s ease',
};

const FormattedLink = ({ page, active, setActivePage }) => {
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      onSetActive={() => setActivePage(page)}
      className="scroll-link"
      style={{
        ...linkStyles,
        color: active ? '#38c0f2' : 'rgba(255, 255, 255, 0.55)',
        fontWeight: active ? 'bold' : 'normal',
        borderBottom: active ? '1.5px solid #38c0f2' : 'none',
        padding: '4px 8px',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'rgba(10, 8, 28, 0.75)',
        backdropFilter: 'blur(16px)',
        height: '64px',
        color: '#ffffff',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(56, 192, 242, 0.15)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.25rem',
              color: '#ffffff',
            }}
          >
            DAVID<span style={{ color: '#38c0f2' }}>RIVA</span>
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {pages.map((page) => (
            <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
```

- [ ] **Step 2: Rewrite `Footer.js`**

```js
'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#060514',
        color: 'rgba(255, 255, 255, 0.35)',
        width: '100%',
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        mt: 0,
        pt: '1rem',
        pb: '1rem',
      }}
    >
      <ReturnToTopButton />
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.35)',
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: 10,
        }}
      >
        David Riva © {new Date().getFullYear()}. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
```

- [ ] **Step 3: Commit**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app
git add src/components/Navbar/NavBar.js src/components/Footer/Footer.js
git commit -m "feat: glass navbar with cyan active links, dark footer"
```

Return: "Agent A complete — NavBar and Footer updated."

---

### Task 4 — Agent B: Hero (Greeting.jsx + ParticleBackground.js)

**Self-contained agent prompt:**

> You are implementing a glass/dark aesthetic redesign for a Next.js portfolio. Modify exactly 2 files in `/Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app/src/`. The theme is now static dark-only — no `ColorModeContext`, no `useTheme` for mode detection. `page.js` already passes `backgroundColor="#0f0c29"` to `ParticleBackground`.
>
> Implement these files exactly as specified, then commit.

**Files:**
- Modify: `next-app/src/components/Greeting-Page/Greeting.jsx`
- Modify: `next-app/src/components/ParticleBackground.js`

- [ ] **Step 1: Rewrite `Greeting.jsx`** — animated gradient bg layer, glass pill label, clamp font, glassmorphic CTA buttons

```jsx
'use client';

import { Box, Typography, Stack } from '@mui/material';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AssistantIcon from '@mui/icons-material/Assistant';
import Link from 'next/link';

const gradShiftKeyframes = `
  @keyframes gradShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Greeting = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about');
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - 70, behavior: 'smooth' });
  };

  return (
    <>
      <style>{gradShiftKeyframes}</style>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0f0c29, #302b63, #0d1b2a, #1a0a2e)',
          backgroundSize: '400% 400%',
          animation: 'gradShift 8s ease infinite',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          color: '#ffffff',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 2,
            py: 0.75,
            mb: 2,
            borderRadius: '20px',
            background: 'rgba(56, 192, 242, 0.08)',
            border: '1px solid rgba(56, 192, 242, 0.25)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>
            Hello, I'm
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          <span style={{ color: '#ffffff' }}>David</span>{' '}
          <span style={{ color: '#38c0f2' }}>Riva</span>
        </Typography>

        <AnimatedTypingTypography />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ mt: { xs: 3, sm: 4 } }}>
          <Box
            component="button"
            onClick={scrollToSection}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.25,
              borderRadius: '50px',
              background: 'rgba(56, 192, 242, 0.12)',
              border: '1px solid rgba(56, 192, 242, 0.45)',
              color: '#38c0f2',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                background: 'rgba(56, 192, 242, 0.2)',
                borderColor: '#38c0f2',
              },
            }}
          >
            <KeyboardDoubleArrowDownIcon fontSize="small" />
            View my work
          </Box>

          <Box
            component={Link}
            href="/chat"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.25,
              borderRadius: '50px',
              background: 'rgba(110, 64, 201, 0.15)',
              border: '1px solid rgba(110, 64, 201, 0.4)',
              color: '#a680ff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
              '&:hover': {
                background: 'rgba(110, 64, 201, 0.25)',
                borderColor: '#6e40c9',
              },
            }}
          >
            <AssistantIcon fontSize="small" />
            Chat with my agent
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Greeting;
```

- [ ] **Step 2: Rewrite `ParticleBackground.js`** — remove `useTheme`, hardcode white particles

```js
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import baseOptions from '../particles-options/parallax-bubble.json';

const ParticleBackground = ({ interactive = true, backgroundColor }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      ...baseOptions,
      background: {
        ...baseOptions.background,
        color: {
          ...baseOptions.background?.color,
          value: backgroundColor || '#0b0920',
        },
      },
      particles: {
        ...baseOptions.particles,
        color: {
          ...baseOptions.particles?.color,
          value: '#ffffff',
        },
        links: baseOptions.particles?.links
          ? {
              ...baseOptions.particles.links,
              color: { ...baseOptions.particles.links.color, value: '#ffffff' },
            }
          : baseOptions.particles?.links,
      },
      interactivity: interactive ? baseOptions.interactivity : undefined,
    }),
    [interactive, backgroundColor]
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
```

- [ ] **Step 3: Commit**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app
git add src/components/Greeting-Page/Greeting.jsx src/components/ParticleBackground.js
git commit -m "feat: animated gradient hero, glass CTA pills, static white particles"
```

Return: "Agent B complete — Greeting and ParticleBackground updated."

---

### Task 5 — Agent C: About (About.js + AboutHeader.js)

**Self-contained agent prompt:**

> You are implementing a glass/dark aesthetic redesign for a Next.js portfolio. Modify exactly 2 files in `/Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app/src/`. The theme is now static dark-only.
>
> Implement these files exactly as specified, then commit.

**Files:**
- Modify: `next-app/src/components/About-Page/About.js`
- Modify: `next-app/src/components/About-Page/AboutHeader.js`

- [ ] **Step 1: Rewrite `About.js`** — gradient headshot ring (2px gradient border around circular image), frosted glass panel around bio content

```js
import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';

const AboutTextSection = () => {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        maxWidth: '600px',
      }}
    >
      <AboutHeader />
      <Biography />
      <AboutFooter />
    </Box>
  );
};

const About = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 6 },
        width: '100%',
        minHeight: '750px',
        pt: '60px',
        pb: '60px',
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          p: '3px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
          flexShrink: 0,
        }}
      >
        <Box sx={{ borderRadius: '50%', overflow: 'hidden', bgcolor: '#0b0920' }}>
          <HeadShotImage width={100} height={100} />
        </Box>
      </Box>

      <AboutTextSection />

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          '@media (max-width: 1250px)': { display: 'none' },
        }}
      >
        <SimpleTimeline />
      </Box>
    </Box>
  );
};

export default About;
```

- [ ] **Step 2: Rewrite `AboutHeader.js`** — remove underline decoration, use static secondary color

```js
import { Typography } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          marginBottom: 1,
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '2.5rem' },
        }}
      >
        David Riva
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: '#38c0f2',
          marginBottom: 1,
        }}
      >
        Technical Trainer
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.55)',
          marginBottom: 2,
        }}
      >
        Bay Area, CA. | <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </>
  );
};

export default AboutHeader;
```

- [ ] **Step 3: Commit**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app
git add src/components/About-Page/About.js src/components/About-Page/AboutHeader.js
git commit -m "feat: gradient headshot ring, frosted glass bio panel, clean about header"
```

Return: "Agent C complete — About and AboutHeader updated."

---

### Task 6 — Agent D: ProjectCard.js

**Self-contained agent prompt:**

> You are implementing a glass/dark aesthetic redesign for a Next.js portfolio. Modify exactly 1 file: `next-app/src/components/Projects-Page/ProjectCard.js`. The theme is static dark-only — remove all `theme.palette.mode` conditionals and replace with the static values specified below.
>
> Implement this file exactly as specified, then commit.

**Files:**
- Modify: `next-app/src/components/Projects-Page/ProjectCard.js`

- [ ] **Step 1: Rewrite `ProjectCard.js`** — glass card, cyan-tinted chips, hover glow + border brighten

```js
'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectImage = ({ coverImage, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '200px',
        width: '100%',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 12, 41, 0.6) 100%)',
        }}
      />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 'bold', mb: 0.5, color: '#ffffff', lineHeight: 1.3 }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.35)', display: 'block', mb: 2 }}>
        {dateStarted} - {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.55)',
          lineHeight: 1.6,
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: '1rem',
        }}
      >
        {short_description}
      </Typography>
    </Box>
  );
};

const ProjectTech = ({ technologies }) => {
  const allTools = technologies.flatMap((t) => t.tools);
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      {allTools.map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: 'rgba(56, 192, 242, 0.08)',
            color: '#38c0f2',
            border: '1px solid rgba(56, 192, 242, 0.2)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'rgba(56, 192, 242, 0.15)' },
          }}
        />
      ))}
    </Stack>
  );
};

const ProjectFooter = ({ link }) => {
  return (
    <Button
      variant="outlined"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<LaunchIcon />}
      fullWidth
      sx={{
        mt: 'auto',
        color: '#38c0f2',
        borderColor: '#38c0f2',
        borderRadius: '8px',
        textTransform: 'none',
        '&:hover': {
          borderColor: '#38c0f2',
          bgcolor: 'rgba(56, 192, 242, 0.1)',
        },
      }}
    >
      View Project
    </Button>
  );
};

const ProjectCard = forwardRef(
  (
    { coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link, onClick, id },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(56, 192, 242, 0.15)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3), 0 0 20px rgba(56, 192, 242, 0.12)',
            border: '1px solid rgba(56, 192, 242, 0.4)',
            '& .project-image': { transform: 'scale(1.05)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <ProjectHeader
            title={title}
            dateStarted={dateStarted}
            dateCompleted={dateCompleted}
            short_description={short_description}
          />
          <ProjectTech technologies={technologies} />
          <ProjectFooter link={link} />
        </CardContent>
      </Card>
    );
  }
);

export default ProjectCard;
```

- [ ] **Step 2: Commit**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app
git add src/components/Projects-Page/ProjectCard.js
git commit -m "feat: glass project cards, cyan tech chips, hover glow"
```

Return: "Agent D complete — ProjectCard updated."

---

### Task 7 — Agent E: ContactForm.js

**Self-contained agent prompt:**

> You are implementing a glass/dark aesthetic redesign for a Next.js portfolio. Modify exactly 1 file: `next-app/src/components/Contact-Page/ContactForm.js`. The theme is static dark-only — remove all `theme.palette.mode` conditionals.
>
> Implement this file exactly as specified, then commit.

**Files:**
- Modify: `next-app/src/components/Contact-Page/ContactForm.js`

- [ ] **Step 1: Rewrite `ContactForm.js`** — glass inputs, gradient submit button, glass panel wrapper

```js
'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';

const inputSx = {
  marginBottom: 2,
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.55)' },
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.25)' },
    '&.Mui-focused fieldset': { borderColor: '#38c0f2' },
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'fit-content',
        maxWidth: '800px',
        bgcolor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        color: '#ffffff',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={inputSx} />
        <TextField fullWidth label="Message" name="message" multiline rows={4} value={formData.message} onChange={handleChange} required sx={inputSx} />

        {!captchaToken && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(token) => setCaptchaToken(token)}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={!captchaToken}
          sx={{
            width: '100%',
            padding: '12px 0',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
            color: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #5bcff5, #8660d4)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Send Message
        </Button>
      </form>

      {status && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: 'center',
            color: status.includes('success') ? '#4caf50' : '#f44336',
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
```

- [ ] **Step 2: Commit**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app
git add src/components/Contact-Page/ContactForm.js
git commit -m "feat: glass contact form inputs, gradient submit button"
```

Return: "Agent E complete — ContactForm updated."

---

## Phase 2 Complete — Orchestrator Verification (Task 8)

After all 5 agents return, run these checks:

- [ ] **Step 1: Run full build**

```bash
cd /Users/davidriva/Desktop/Repos/Personal-Portfolio/next-app && npm run build 2>&1 | tail -30
```
Expected: Build successful, 0 errors.

- [ ] **Step 2: Check for stale ColorModeContext references**

```bash
grep -rn "ColorModeContext\|useColorMode\|toggleColorMode\|Brightness4Icon\|Brightness7Icon" next-app/src/
```
Expected: no matches.

- [ ] **Step 3: Check for surviving mode conditionals in components**

```bash
grep -rn "palette\.mode" next-app/src/components/
```
Expected: no matches.

- [ ] **Step 4: Log summary**

Note which agents completed, any files that needed manual fixup, build status. Done.
