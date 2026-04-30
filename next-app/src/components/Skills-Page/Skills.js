'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import FadeIn from '@/components/FadeIn';

const SkillCategory = ({ title, items, delay }) => (
  <FadeIn delay={delay}>
    <Box
      sx={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        p: 3,
        transition: 'border-color 0.3s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.1)' },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#52525b',
          mb: 2,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        {items.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              color: '#d4d4d8',
              border: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.78rem',
              height: '28px',
              fontWeight: 400,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(56,189,248,0.08)',
                borderColor: 'rgba(56,189,248,0.15)',
                color: '#38bdf8',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  </FadeIn>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  return (
    <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Skills" subtitle="What I work with" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {skills.map((category, i) => (
          <SkillCategory key={category.title} title={category.title} items={category.items} delay={i * 0.06} />
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
