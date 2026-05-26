'use client';

import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import FadeIn from '@/components/shared/FadeIn';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then(setExperiences)
      .catch(console.error);
  }, []);

  const workExperiences = experiences.filter((e) => e.bulletPoints);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, textAlign: 'center' }}>
          Experience
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 8, maxWidth: 500, mx: 'auto' }}>
          Where I&apos;ve worked and what I&apos;ve built
        </Typography>
      </FadeIn>

      <Box sx={{ position: 'relative' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 20, md: 24 },
            top: 0,
            bottom: 0,
            width: '1px',
            bgcolor: 'rgba(255,255,255,0.06)',
          }}
        />

        <Stack spacing={5}>
          {workExperiences.map((exp, i) => (
            <FadeIn key={exp.title} delay={i * 0.1}>
              <Box sx={{ display: 'flex', gap: { xs: 3, md: 4 } }}>
                {/* Timeline dot + logo */}
                <Box sx={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      borderRadius: '12px',
                      overflow: 'hidden',
                      bgcolor: '#141419',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={`/images/${exp.logoImage}`}
                      alt={exp.company}
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, pb: 2 }}>
                  <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' }, color: 'primary.main', fontWeight: 500, mb: 0.5 }}>
                    {exp.startDate} — {exp.endDate}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                      mb: 0.5,
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 2 }}>
                    {exp.company} · {exp.location}
                  </Typography>

                  {exp.bulletPoints && (
                    <Stack spacing={1.5}>
                      {exp.bulletPoints.slice(0, 3).map((bp, j) => (
                        <Typography
                          key={j}
                          sx={{
                            fontSize: '0.875rem',
                            color: 'text.secondary',
                            lineHeight: 1.7,
                            pl: 2,
                            borderLeft: '2px solid rgba(99, 102, 241, 0.2)',
                          }}
                        >
                          {bp}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Box>
            </FadeIn>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Experience;
