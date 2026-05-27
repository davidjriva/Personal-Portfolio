'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FadeIn from '@/components/sections/FadeIn';

const Awards = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then(setAwards)
      .catch(console.error);
  }, []);

  return (
    <Box
      id="awards"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
          RECOGNITION
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 6 }}>
          Awards & honors
        </Typography>
      </FadeIn>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        {awards.map((award, i) => (
          <FadeIn key={award.title} delay={i * 0.1}>
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                bgcolor: 'rgba(255,255,255,0.02)',
                height: '100%',
                display: 'flex',
                gap: 2.5,
                transition: 'border-color 0.3s',
                '&:hover': { borderColor: 'rgba(129,140,248,0.12)' },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: 'rgba(129,140,248,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmojiEventsIcon sx={{ color: 'primary.light', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 700, mb: 0.5, lineHeight: 1.3 }}>
                  {award.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mb: 1 }}>
                  {award.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                  {award.date}
                </Typography>
              </Box>
            </Box>
          </FadeIn>
        ))}
      </Box>
    </Box>
  );
};

export default Awards;
