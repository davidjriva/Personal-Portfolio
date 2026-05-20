'use client';

import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ReturnToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          bgcolor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          color: 'rgba(255,255,255,0.4)',
          width: 40,
          height: 40,
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(12px)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.15)',
            color: '#e8e8ed',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
