'use client';

import { Box, Typography, IconButton, Link, Button, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';

const glassCard = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease, background 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.03)',
  },
};

const StatCard = ({ value, label, delay }) => (
  <FadeIn delay={delay}>
    <Box sx={{ ...glassCard, textAlign: 'center', p: 3 }}>
      <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#38bdf8', lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontSize: '0.78rem', color: '#71717a', mt: 1, fontWeight: 500 }}>{label}</Typography>
    </Box>
  </FadeIn>
);

const About = () => {
  return (
    <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="About" subtitle="Who I am" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
          gridTemplateRows: 'auto',
          gap: 2.5,
        }}
      >
        {/* Photo card */}
        <FadeIn delay={0.05}>
          <Box
            sx={{
              ...glassCard,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 5,
              gridRow: { md: '1 / 3' },
            }}
          >
            <Box
              sx={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(56, 189, 248, 0.15)',
                mb: 3,
              }}
            >
              <Image
                src="/images/headshot.webp"
                alt="David Riva"
                width={180}
                height={180}
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>

            <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#fafafa' }}>David Riva</Typography>
            <Typography sx={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 500, mt: 0.5 }}>
              Training Engineer, Generative AI
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: '#71717a' }}>
              <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem' }} />
              <Typography sx={{ fontSize: '0.78rem' }}>Bay Area, CA</Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ mt: 2.5 }}>
              <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
                <IconButton
                  aria-label="GitHub"
                  size="small"
                  sx={{
                    color: '#71717a',
                    '&:hover': { color: '#fafafa', backgroundColor: 'rgba(255,255,255,0.06)' },
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
                    color: '#71717a',
                    '&:hover': { color: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.06)' },
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
                    color: '#71717a',
                    '&:hover': { color: '#fafafa', backgroundColor: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  <EmailOutlinedIcon fontSize="small" />
                </IconButton>
              </Link>
            </Stack>

            <Button
              variant="outlined"
              size="small"
              startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '0.9rem' }} />}
              onClick={() => window.open('/documents/resume.pdf', '_blank')}
              sx={{
                mt: 2.5,
                color: '#a1a1aa',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.78rem',
                fontWeight: 500,
                px: 2,
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#fafafa',
                },
              }}
            >
              View Resume
            </Button>
          </Box>
        </FadeIn>

        {/* Bio card */}
        <FadeIn delay={0.1}>
          <Box sx={glassCard}>
            <Typography variant="body1" sx={{ color: '#d4d4d8', lineHeight: 1.8 }}>
              Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area — a Colorado State University
              graduate with a B.S. in Computer Science, Summa Cum Laude. I&apos;m passionate about applied AI and
              building systems that work at scale.
            </Typography>
            <Typography variant="body1" sx={{ color: '#d4d4d8', lineHeight: 1.8, mt: 2 }}>
              I specialize in full-stack development, AI/ML engineering, and data systems. I pride myself on elegant
              problem-solving and consistently delivering high-quality work.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
              {['AI/ML', 'Full-Stack', 'RAG Systems', 'React', 'Python', 'TypeScript'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(56,189,248,0.06)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56,189,248,0.12)',
                    fontSize: '0.72rem',
                    height: '24px',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </FadeIn>

        {/* Stats row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          <StatCard value="2+" label="Years Experience" delay={0.15} />
          <StatCard value="11" label="Projects Built" delay={0.2} />
          <StatCard value="4.0" label="GPA" delay={0.25} />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
