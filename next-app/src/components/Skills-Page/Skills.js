'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Skeleton } from '@mui/material';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '900px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.3)', mb: 4, display: 'block' }}>
        Skills & Tools
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Skeleton variant="text" width="20%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton
                    key={j}
                    variant="rounded"
                    width={80}
                    height={28}
                    sx={{ borderRadius: '8px', bgcolor: 'rgba(255,255,255,0.04)' }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {skills.map((category) => (
            <Box key={category.title}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.5)',
                  mb: 1.5,
                  letterSpacing: '0.02em',
                }}
              >
                {category.title}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {category.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.03)',
                      color: 'rgba(255, 255, 255, 0.55)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      height: '30px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#e8e6e3',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Skills;
