'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';
import SectionHeading from '@/components/SectionHeading';

const BentoCard = ({ children, sx = {} }) => (
  <Box
    sx={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      p: { xs: 3, md: 4 },
      transition: 'border-color 0.3s ease',
      '&:hover': {
        borderColor: 'rgba(255,255,255,0.12)',
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

const SkillsGrid = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data))
      .catch(() => {});
  }, []);

  return (
    <Box>
      {skillsData.map((category) => (
        <Box key={category.title} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
          <Typography
            variant="caption"
            sx={{
              color: '#71717a',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 1,
              display: 'block',
            }}
          >
            {category.title}
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75}>
            {category.items.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.05)',
                  color: '#a1a1aa',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.72rem',
                  height: '26px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(59,130,246,0.08)',
                    borderColor: 'rgba(59,130,246,0.2)',
                    color: '#60a5fa',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

const About = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, md: 4, lg: 6 },
      }}
    >
      <SectionHeading sectionName="About" />

      {/* Top row: headshot + bio */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Profile card */}
        <BentoCard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              p: '2px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              flexShrink: 0,
            }}
          >
            <Box sx={{ borderRadius: '50%', overflow: 'hidden', bgcolor: '#09090b' }}>
              <HeadShotImage width={160} height={160} />
            </Box>
          </Box>
          <AboutHeader />
          <AboutFooter />
        </BentoCard>

        {/* Bio card */}
        <BentoCard>
          <Typography
            variant="caption"
            sx={{
              color: '#71717a',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 2,
              display: 'block',
            }}
          >
            Background
          </Typography>
          <Biography />
        </BentoCard>
      </Box>

      {/* Bottom row: timeline + skills */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Timeline card */}
        <BentoCard>
          <Typography
            variant="caption"
            sx={{
              color: '#71717a',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 2,
              display: 'block',
            }}
          >
            Experience
          </Typography>
          <SimpleTimeline />
        </BentoCard>

        {/* Skills card */}
        <BentoCard>
          <Typography
            variant="caption"
            sx={{
              color: '#71717a',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 2,
              display: 'block',
            }}
          >
            Skills & Technologies
          </Typography>
          <SkillsGrid />
        </BentoCard>
      </Box>
    </Box>
  );
};

export default About;
