'use client';

import { Box, Typography, Grid, IconButton, Link } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SectionHeading from '@/components/SectionHeading';

const BentoCard = ({ children, sx = {} }) => (
  <Box
    sx={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      p: { xs: 2.5, md: 3 },
      height: '100%',
      transition: 'border-color 0.3s ease, background 0.3s ease',
      '&:hover': {
        borderColor: 'rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

const StatItem = ({ value, label }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 700, color: '#fafafa', lineHeight: 1 }}>
      {value}
    </Typography>
    <Typography sx={{ fontSize: '0.7rem', color: '#52525b', fontWeight: 500, letterSpacing: '0.08em', mt: 0.5, textTransform: 'uppercase' }}>
      {label}
    </Typography>
  </Box>
);

const About = () => {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="About" subtitle="A bit about me" />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <BentoCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2.5 }}>
            <Box
              sx={{
                width: { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}
            >
              <Image
                alt="David Riva"
                src="/images/headshot.webp"
                width={180}
                height={180}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#fafafa', letterSpacing: '-0.02em' }}>
                David Riva
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 500, mt: 0.25 }}>
                Software Engineer
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#52525b', mt: 0.5 }}>
                Bay Area, CA
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
                <IconButton
                  size="small"
                  sx={{
                    color: '#52525b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    width: 36,
                    height: 36,
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Link>
              <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
                <IconButton
                  size="small"
                  sx={{
                    color: '#52525b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    width: 36,
                    height: 36,
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#3b82f6', borderColor: 'rgba(59,130,246,0.3)' },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Link>
              <Link href="mailto:davidjriva@gmail.com">
                <IconButton
                  size="small"
                  sx={{
                    color: '#52525b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    width: 36,
                    height: 36,
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  <EmailOutlinedIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Link>
              <IconButton
                size="small"
                onClick={() => window.open('/documents/resume.pdf', '_blank')}
                sx={{
                  color: '#52525b',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  width: 36,
                  height: 36,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.3)' },
                }}
              >
                <DescriptionOutlinedIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
          </BentoCard>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <BentoCard sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1.5 }}>
                Background
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.75 }}>
                Software engineer based in the Bay Area with a B.S. in Computer Science from Colorado State University, graduated Summa Cum Laude. I specialize in applied AI engineering, full-stack development, and building production-grade systems that solve real problems.
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.75, mt: 1.5 }}>
                Most recently at C3 AI, I built internal tooling and training infrastructure serving 8,000+ learners globally, and won 1st place at their Agentic AI Hackathon. I&apos;m passionate about the intersection of AI and software engineering — from RAG pipelines and agentic systems to clean, performant web applications.
              </Typography>
            </BentoCard>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <BentoCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StatItem value="3+" label="Years Exp." />
                </BentoCard>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <BentoCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StatItem value="11" label="Projects" />
                </BentoCard>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <BentoCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StatItem value="4.0" label="GPA" />
                </BentoCard>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <BentoCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StatItem value="4" label="Awards" />
                </BentoCard>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
