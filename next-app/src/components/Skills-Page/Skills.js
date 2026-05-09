'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import RevealOnScroll from '@/components/RevealOnScroll';

const categoryColors = {
  Languages: { bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' },
  'AI Orchestration & Machine Learning': { bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' },
  'Web Development': { bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
  'Big Data & Cloud': { bg: 'rgba(20, 184, 166, 0.08)', border: 'rgba(20, 184, 166, 0.15)', text: '#5eead4' },
  'Databases & Tools': { bg: 'rgba(251, 146, 60, 0.08)', border: 'rgba(251, 146, 60, 0.15)', text: '#fdba74' },
  'Testing & Validation': { bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.15)', text: '#6ee7b7' },
  'Data Science Libraries': { bg: 'rgba(244, 114, 182, 0.08)', border: 'rgba(244, 114, 182, 0.15)', text: '#f9a8d4' },
};

const fallbackColor = { bg: 'rgba(255, 255, 255, 0.04)', border: 'rgba(255, 255, 255, 0.08)', text: '#a1a1aa' };

const SkillCategory = ({ title, items, index }) => {
  const colors = categoryColors[title] || fallbackColor;

  return (
    <RevealOnScroll
      delay={index * 0.06}
      sx={{
        bgcolor: '#131316',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        p: 3,
        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      }}
    >
      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: colors.text, mb: 2, letterSpacing: '0.02em' }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        {items.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={{
              bgcolor: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              fontSize: '0.75rem',
              fontWeight: 500,
              height: '28px',
              '& .MuiChip-label': { px: 1.5 },
              transition: 'all 0.2s ease',
              '&:hover': { opacity: 0.8 },
            }}
          />
        ))}
      </Stack>
    </RevealOnScroll>
  );
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data));
  }, []);

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
      <SectionHeading sectionName="Skills" />

      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {skillsData.map((skill, index) => (
          <SkillCategory key={skill.title} {...skill} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
