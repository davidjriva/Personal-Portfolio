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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(129, 140, 248, 0.1)',
        border: '1px solid rgba(129, 140, 248, 0.2)',
        borderRadius: '10px',
        padding: '2px',
        transition: 'all 0.25s ease',
        '&:hover': {
          backgroundColor: 'rgba(129, 140, 248, 0.15)',
          borderColor: 'rgba(129, 140, 248, 0.4)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ color: '#818CF8', fontSize: '1.25rem', padding: '4px' }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 'inherit' }} />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
