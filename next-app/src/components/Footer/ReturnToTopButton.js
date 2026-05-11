'use client';

import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ReturnToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <IconButton
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Return to top"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        bgcolor: 'rgba(139,92,246,0.12)',
        border: '1px solid rgba(139,92,246,0.25)',
        color: '#a78bfa',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.2s ease',
        zIndex: 1000,
        '&:hover': {
          bgcolor: 'rgba(139,92,246,0.2)',
          borderColor: 'rgba(139,92,246,0.45)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <KeyboardDoubleArrowUpIcon sx={{ fontSize: '1.25rem' }} />
    </IconButton>
  );
};

export default ReturnToTopButton;
