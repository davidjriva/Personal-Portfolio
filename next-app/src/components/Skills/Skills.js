'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Grid } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';

const categoryColors = {
  Languages: '#3b82f6',
  'AI Orchestration & Machine Learning': '#8b5cf6',
  'Web Development': '#06b6d4',
  'Big Data & Cloud': '#f59e0b',
  'Databases & Tools': '#22c55e',
  'Testing & Validation': '#ef4444',
  'Data Science Libraries': '#ec4899',
};

const SkillCategory = ({ title, items }) => {
  const color = categoryColors[title] || '#3b82f6';

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: `${color}20`,
          background: `${color}05`,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {items.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              color: '#a1a1aa',
              border: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.72rem',
              height: 26,
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: `${color}12`,
                borderColor: `${color}30`,
                color: '#fafafa',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Skills" subtitle="Technologies I work with" />

      <Grid container spacing={2}>
        {skills.map((category) => (
          <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <SkillCategory title={category.title} items={category.items} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
