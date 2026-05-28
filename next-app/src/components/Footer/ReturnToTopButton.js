'use client';

import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ReturnToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ color: 'rgba(255,255,255,0.4)', p: 0.75, '&:hover': { color: '#fafafa' } }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
