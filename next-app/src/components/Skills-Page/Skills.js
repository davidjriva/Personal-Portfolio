'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'David Riva | Skills',
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="Skills" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {skillsData.map((skill) => (
          <Box key={skill.title}>
            <Typography
              sx={{
                color: '#52525B',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              {skill.title}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {skill.items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    color: '#A1A1AA',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    height: '30px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(129, 140, 248, 0.08)',
                      borderColor: 'rgba(129, 140, 248, 0.2)',
                      color: '#A5B4FC',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
