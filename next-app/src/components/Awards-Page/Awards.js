'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SectionHeading from '@/components/SectionHeading';
import FadeIn from '@/components/FadeIn';

const AwardItem = ({ title, description, date, delay }) => (
  <FadeIn delay={delay}>
    <Box
      sx={{
        display: 'flex',
        gap: 2.5,
        p: 3,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        transition: 'border-color 0.3s ease',
        '&:hover': { borderColor: 'rgba(255,255,255,0.1)' },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          backgroundColor: 'rgba(250, 204, 21, 0.08)',
          border: '1px solid rgba(250, 204, 21, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <EmojiEventsOutlinedIcon sx={{ fontSize: '1rem', color: '#facc15' }} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#fafafa', lineHeight: 1.3 }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#52525b', mt: 0.25 }}>{date}</Typography>
        <Typography sx={{ fontSize: '0.82rem', color: '#a1a1aa', mt: 1, lineHeight: 1.5 }}>{description}</Typography>
      </Box>
    </Box>
  </FadeIn>
);

const Awards = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then(setAwards);
  }, []);

  return (
    <Box sx={{ maxWidth: '700px', mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Awards" subtitle="Recognition" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {awards.map((award, i) => (
          <AwardItem key={award.title} {...award} delay={i * 0.08} />
        ))}
      </Box>
    </Box>
  );
};

export default Awards;
