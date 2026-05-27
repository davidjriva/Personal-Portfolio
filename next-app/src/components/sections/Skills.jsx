'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import FadeIn from '@/components/sections/FadeIn';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then(setSkills)
      .catch(console.error);
  }, []);

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
          SKILLS
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 6 }}>
          Technologies & tools
        </Typography>
      </FadeIn>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {skills.map((category, i) => (
          <FadeIn key={category.title} delay={i * 0.08}>
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                bgcolor: 'rgba(255,255,255,0.02)',
                height: '100%',
                transition: 'border-color 0.3s',
                '&:hover': { borderColor: 'rgba(129,140,248,0.12)' },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.light',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {category.title}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {category.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      height: 28,
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: 'text.secondary',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'rgba(129,140,248,0.08)',
                        borderColor: 'rgba(129,140,248,0.15)',
                        color: '#fafafa',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </FadeIn>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
