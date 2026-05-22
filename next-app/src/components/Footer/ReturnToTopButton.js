'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
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
      component="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        bgcolor: 'rgba(255, 255, 255, 0.03)',
        color: '#52525b',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        '&:hover': {
          borderColor: 'rgba(56, 192, 242, 0.2)',
          color: '#38c0f2',
          bgcolor: 'rgba(56, 192, 242, 0.05)',
        },
      }}
    >
      <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
    </Box>
  );
};

export default ReturnToTopButton;
