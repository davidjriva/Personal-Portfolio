'use client';

import { Box, Typography, Button, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import FadeIn from '@/components/sections/FadeIn';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '11', label: 'Projects Built' },
  { value: '4.0', label: 'GPA' },
];

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
          ABOUT
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 6 }}>
          Get to know me
        </Typography>
      </FadeIn>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 5, md: 8 },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Headshot */}
        <FadeIn delay={0.1} direction="right">
          <Box
            sx={{
              width: { xs: 220, sm: 260, md: 280 },
              height: { xs: 220, sm: 260, md: 280 },
              borderRadius: '20px',
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              component="img"
              src="/images/headshot.webp"
              alt="David Riva"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </FadeIn>

        {/* Bio */}
        <FadeIn delay={0.2} direction="left">
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5 }}>
              Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado
              State University where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m
              passionate about applied AI engineering and building software that solves real problems.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5 }}>
              I&apos;m experienced in full-stack development, AI orchestration, and big data visualization. My work
              ranges from production RAG pipelines and agentic AI systems to interactive web applications serving
              thousands of users.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              I pride myself on elegant problem-solving, clean architecture, and maintaining high standards of
              engineering excellence.
            </Typography>

            {/* Stats */}
            <Stack direction="row" spacing={{ xs: 3, sm: 5 }} mb={4}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2rem' },
                      background: 'linear-gradient(135deg, #818cf8, #34d399)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Actions */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component="a"
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener"
                variant="outlined"
                startIcon={<DownloadIcon />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: '#fafafa',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(129,140,248,0.06)',
                  },
                }}
              >
                Resume
              </Button>
              <IconButton
                component="a"
                href="https://github.com/davidjriva"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                sx={{ color: 'text.secondary', '&:hover': { color: '#fafafa' } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/david-j-riva"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                sx={{ color: 'text.secondary', '&:hover': { color: '#fafafa' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </FadeIn>
      </Box>
    </Box>
  );
};

export default About;
