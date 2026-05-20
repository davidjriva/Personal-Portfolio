'use client';

import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: 32,
        height: 32,
      }}
    >
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 35L18 50L30 65" stroke="#00d4ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 35L82 50L70 65" stroke="#00d4ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 30L42 70" stroke="#a78bfa" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </Box>
  );
};

export default Logo;
