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
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          border: '1px solid rgba(232, 230, 227, 0.1)',
          color: 'rgba(232, 230, 227, 0.35)',
          transition: 'all 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(232, 230, 227, 0.2)',
            color: '#e8e6e3',
            bgcolor: 'rgba(232, 230, 227, 0.04)',
          },
        }}
      >
        <KeyboardArrowUpIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ReturnToTopButton;
