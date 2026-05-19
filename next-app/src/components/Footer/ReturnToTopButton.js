'use client';

import { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
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
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 50,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.2)',
            color: '#fafafa',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
