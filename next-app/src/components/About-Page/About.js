'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Link, Button, Stack } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SectionHeading from '@/components/SectionHeading';
import RevealOnScroll from '@/components/RevealOnScroll';

const cardSx = {
  bgcolor: '#131316',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '20px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease',
  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.1)' },
};

const About = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then((data) => setAwards(data));
  }, []);

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
      <SectionHeading sectionName="About" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '320px 1fr 280px' },
          gap: 2,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {/* Photo card */}
        <RevealOnScroll delay={0} sx={{ ...cardSx, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Image
              alt="Photo of David Riva"
              src="/images/headshot.webp"
              width={200}
              height={200}
              style={{ objectFit: 'cover', display: 'block' }}
              priority
            />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', color: '#f4f4f5', mb: 0.5 }}>
              David Riva
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 500, mb: 1 }}>
              Training Engineer, Generative AI
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
              <IconButton
                aria-label="GitHub"
                size="small"
                sx={{
                  color: '#6b7280',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#f4f4f5', borderColor: 'rgba(255, 255, 255, 0.15)' },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
              <IconButton
                aria-label="LinkedIn"
                size="small"
                sx={{
                  color: '#6b7280',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#f4f4f5', borderColor: 'rgba(255, 255, 255, 0.15)' },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link href="mailto:davidjriva@gmail.com">
              <IconButton
                aria-label="Email"
                size="small"
                sx={{
                  color: '#6b7280',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': { color: '#f4f4f5', borderColor: 'rgba(255, 255, 255, 0.15)' },
                }}
              >
                <EmailOutlinedIcon fontSize="small" />
              </IconButton>
            </Link>
          </Stack>
        </RevealOnScroll>

        {/* Bio card */}
        <RevealOnScroll delay={0.1} sx={{ ...cardSx, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.8, mb: 2.5 }}>
            Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
            University with a B.S. in Computer Science, Summa Cum Laude. I&apos;m passionate about applied AI
            engineering and building production-grade software.
          </Typography>
          <Typography sx={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.8, mb: 2.5 }}>
            I specialize in full-stack development, AI systems, and data engineering. I have a strong background
            in data structures, algorithms, and mathematical applications — and I pride myself on elegant
            problem-solving and high standards of excellence.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <PlaceOutlinedIcon sx={{ fontSize: '1rem', color: '#6b7280' }} />
              <Typography sx={{ fontSize: '0.82rem', color: '#6b7280' }}>Bay Area, CA</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <EmailOutlinedIcon sx={{ fontSize: '1rem', color: '#6b7280' }} />
              <Typography
                component="a"
                href="mailto:davidjriva@gmail.com"
                sx={{
                  fontSize: '0.82rem',
                  color: '#6b7280',
                  textDecoration: 'none',
                  '&:hover': { color: '#a1a1aa' },
                }}
              >
                davidjriva@gmail.com
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={() => window.open('/documents/resume.pdf', '_blank')}
            startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem' }} />}
            sx={{
              mt: 3,
              alignSelf: 'flex-start',
              color: '#f4f4f5',
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.82rem',
              px: 2.5,
              py: 1,
              '&:hover': {
                bgcolor: 'rgba(99, 102, 241, 0.18)',
                borderColor: 'rgba(99, 102, 241, 0.35)',
              },
            }}
          >
            View Resume
          </Button>
        </RevealOnScroll>

        {/* Stats + Awards column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Stats card */}
          <RevealOnScroll delay={0.2} sx={cardSx}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { value: '2+', label: 'Years Exp.' },
                { value: '10+', label: 'Projects' },
                { value: '4.0', label: 'GPA' },
                { value: '1st', label: 'Hackathon' },
              ].map((stat) => (
                <Box key={stat.label} sx={{ textAlign: 'center', py: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#6b7280', mt: 0.5, fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </RevealOnScroll>

          {/* Awards card */}
          <RevealOnScroll delay={0.3} sx={{ ...cardSx, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <EmojiEventsOutlinedIcon sx={{ fontSize: '1.1rem', color: '#a855f7' }} />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Awards
              </Typography>
            </Box>
            {awards.map((award) => (
              <Box key={award.title} sx={{ mb: 1.5, '&:last-child': { mb: 0 } }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#e4e4e7', lineHeight: 1.3, mb: 0.25 }}>
                  {award.title}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#6b7280' }}>{award.date}</Typography>
              </Box>
            ))}
          </RevealOnScroll>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
