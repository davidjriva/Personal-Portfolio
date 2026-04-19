'use client';

import { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ReturnToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
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
        backgroundColor: '#38c0f2',
        borderRadius: '8px',
        padding: '4px',
        maxWidth: '50px',
        margin: '0 auto',
        '@keyframes jump': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        '&:hover': { animation: 'jump 1s infinite' },
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ color: 'white', fontSize: '1.5rem', padding: '4px' }}
      >
        <KeyboardDoubleArrowUpIcon sx={{ fontSize: 'inherit' }} />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
