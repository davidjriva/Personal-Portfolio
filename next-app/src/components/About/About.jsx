'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SectionWrapper from '@/components/shared/SectionWrapper';
import FadeInView from '@/components/shared/FadeInView';

const GlassCard = ({ children, sx = {}, ...props }) => (
  <Box
    sx={{
      bgcolor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      p: { xs: 2.5, md: 3 },
      transition: 'border-color 0.3s ease',
      '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

const About = () => {
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((r) => r.json())
      .then(setSkills)
      .catch(() => {});
    fetch('/data/awards.json')
      .then((r) => r.json())
      .then(setAwards)
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper label="About" title="A bit about me" maxWidth="1200px">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gridTemplateRows: 'auto',
          gap: 2,
        }}
      >
        {/* Bio card - spans 2 cols */}
        <FadeInView delay={0.05} sx={{ gridColumn: { xs: '1', md: '1 / 3' } }}>
          <GlassCard sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '16px',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid rgba(167, 139, 250, 0.2)',
              }}
            >
              <Image
                src="/images/headshot.webp"
                alt="David Riva"
                width={100}
                height={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontSize: '1.2rem', mb: 1, color: '#fafafa' }}>
                David Riva
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', mb: 1.5, lineHeight: 1.7 }}>
                Software engineer based in the Bay Area with a B.S. in Computer Science from Colorado State University
                (Summa Cum Laude). I build production AI systems — RAG pipelines, agentic workflows, and full-stack
                applications — with a focus on measurable quality and clean architecture.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <IconButton
                  component="a"
                  href="https://github.com/davidjriva"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fafafa' }, p: 0.75 }}
                >
                  <GitHubIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/david-j-riva"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#38bdf8' }, p: 0.75 }}
                >
                  <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="mailto:davidjriva@gmail.com"
                  aria-label="Email"
                  sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#a78bfa' }, p: 0.75 }}
                >
                  <EmailIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="/documents/resume.pdf"
                  target="_blank"
                  aria-label="Resume"
                  sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fafafa' }, p: 0.75 }}
                >
                  <DescriptionIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Stack>
            </Box>
          </GlassCard>
        </FadeInView>

        {/* Awards card */}
        <FadeInView delay={0.15}>
          <GlassCard sx={{ height: '100%' }}>
            <Typography
              variant="overline"
              sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', letterSpacing: '0.12em', mb: 2, display: 'block' }}
            >
              Recognition
            </Typography>
            <Stack spacing={2}>
              {awards.slice(0, 3).map((award) => (
                <Box key={award.title} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <EmojiEventsIcon sx={{ color: '#fbbf24', fontSize: '1rem', mt: '3px', flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#fafafa', lineHeight: 1.3 }}>
                      {award.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', mt: 0.25 }}>
                      {award.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </FadeInView>

        {/* Skills grid - spans full width */}
        <FadeInView delay={0.2} sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <GlassCard>
            <Typography
              variant="overline"
              sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', letterSpacing: '0.12em', mb: 2.5, display: 'block' }}
            >
              Technical Skills
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 2.5,
              }}
            >
              {skills.slice(0, 4).map((category) => (
                <Box key={category.title}>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#a78bfa',
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5}>
                    {category.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.55)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          fontSize: '0.7rem',
                          height: '24px',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
            {skills.length > 4 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                  gap: 2.5,
                  mt: 2.5,
                }}
              >
                {skills.slice(4).map((category) => (
                  <Box key={category.title}>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#a78bfa',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5}>
                      {category.items.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.04)',
                            color: 'rgba(255,255,255,0.55)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            fontSize: '0.7rem',
                            height: '24px',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Box>
            )}
          </GlassCard>
        </FadeInView>
      </Box>
    </SectionWrapper>
  );
};

export default About;
