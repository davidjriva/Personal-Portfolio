'use client';

import { Box, Typography, Button, IconButton, Stack, Chip } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FadeIn from '@/components/shared/FadeIn';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '11', label: 'Projects Built' },
  { value: '4.0', label: 'GPA' },
];

const About = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 5, md: 8 },
          }}
        >
          {/* Headshot */}
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                width: { xs: 200, md: 260 },
                height: { xs: 200, md: 260 },
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 0 60px rgba(99, 102, 241, 0.08)',
                position: 'relative',
              }}
            >
              <Image src="/images/headshot.webp" alt="David Riva" fill style={{ objectFit: 'cover' }} priority />
            </Box>
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>
              About Me
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip
                icon={<LocationOnIcon sx={{ fontSize: '1rem' }} />}
                label="Bay Area, CA"
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'text.secondary',
                  '& .MuiChip-icon': { color: 'text.secondary' },
                }}
              />
            </Stack>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.8,
                mb: 2,
                maxWidth: 600,
              }}
            >
              I&apos;m a software engineer from the Bay Area with a B.S. in Computer Science from Colorado State
              University, graduated Summa Cum Laude. I specialize in AI engineering, full-stack development, and
              building tools that make developers more productive.
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 600,
              }}
            >
              Most recently, I was a Training Engineer at C3 AI, where I won 1st place at the company&apos;s Agentic AI
              Hackathon and built internal tools that cut feedback turnaround by 80%. I&apos;m passionate about shipping
              clean, high-quality software.
            </Typography>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 5 }}
              sx={{ mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              {stats.map((s) => (
                <Box key={s.label} sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      fontWeight: 700,
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                      background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      lineHeight: 1.2,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>{s.label}</Typography>
                </Box>
              ))}
            </Stack>

            {/* Actions */}
            <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="outlined"
                startIcon={<DescriptionIcon />}
                href="/documents/resume.pdf"
                target="_blank"
                sx={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.08)' },
                }}
              >
                Resume
              </Button>
              <IconButton
                href="https://github.com/davidjriva"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/davidjriva"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </FadeIn>
    </Box>
  );
};

export default About;
