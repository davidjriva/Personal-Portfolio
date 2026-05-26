'use client';

import { Box, Typography, Chip, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import FadeIn from '@/components/shared/FadeIn';

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
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, textAlign: 'center' }}>
          Skills
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 8, maxWidth: 500, mx: 'auto' }}>
          Technologies and tools I work with
        </Typography>
      </FadeIn>

      <Stack spacing={5}>
        {skills.map((category, i) => (
          <FadeIn key={category.title} delay={i * 0.08}>
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'primary.main',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  mb: 2,
                }}
              >
                {category.title}
              </Typography>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                {category.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'text.primary',
                      fontSize: '0.85rem',
                      fontWeight: 400,
                      height: 36,
                      '&:hover': {
                        bgcolor: 'rgba(99, 102, 241, 0.08)',
                        borderColor: 'rgba(99, 102, 241, 0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </FadeIn>
        ))}
      </Stack>
    </Box>
  );
};

export default Skills;
