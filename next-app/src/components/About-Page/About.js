'use client';

import { Box, Typography, IconButton, Link, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Image from 'next/image';

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '900px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Headshot */}
        <Box sx={{ flexShrink: 0 }}>
          <Box
            sx={{
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
            }}
          >
            <Image
              alt="David Riva"
              src="/images/headshot.webp"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="160px"
            />
          </Box>
        </Box>

        {/* Text content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.3)',
              mb: 1,
              display: 'block',
            }}
          >
            About
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.85rem' },
              fontWeight: 700,
              mb: 1,
              color: '#e8e6e3',
              letterSpacing: '-0.02em',
            }}
          >
            David Riva
          </Typography>

          <Typography
            sx={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#6eb6f0',
              mb: 0.5,
            }}
          >
            Software Engineer
          </Typography>

          <Typography
            sx={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.35)',
              mb: 3,
            }}
          >
            Bay Area, CA
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              mb: 2,
              maxWidth: '580px',
            }}
          >
            Software engineer with a focus on applied AI and full-stack development. I graduated from Colorado State
            University with a B.S. in Computer Science, Summa Cum Laude, and I&apos;m passionate about building systems
            that are both technically rigorous and genuinely useful.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              mb: 4,
              maxWidth: '580px',
            }}
          >
            Experienced in production ML pipelines, data engineering, and creating interfaces that make complex data
            accessible. I believe in elegant problem-solving and maintaining high standards of craft.
          </Typography>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              href="/documents/resume.pdf"
              target="_blank"
              endIcon={<ArrowOutwardIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                color: '#e8e6e3',
                bgcolor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                px: 2,
                py: 0.75,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              Resume
            </Button>

            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
              <IconButton
                size="small"
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#e8e6e3', bgcolor: 'rgba(255,255,255,0.06)' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.15rem' }} />
              </IconButton>
            </Link>

            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
              <IconButton
                size="small"
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#6eb6f0', bgcolor: 'rgba(110, 182, 240, 0.08)' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.15rem' }} />
              </IconButton>
            </Link>

            <Link href="mailto:davidjriva@gmail.com">
              <IconButton
                size="small"
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#a78bfa', bgcolor: 'rgba(167, 139, 250, 0.08)' },
                }}
              >
                <EmailOutlinedIcon sx={{ fontSize: '1.15rem' }} />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
