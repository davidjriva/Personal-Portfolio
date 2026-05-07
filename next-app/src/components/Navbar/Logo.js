'use client';

import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="84" height="84" rx="20" stroke="#60a5fa" strokeWidth="6" opacity="0.3" />
        <path d="M32 38L22 50L32 62" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M68 38L78 50L68 62" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M56 32L44 68" stroke="#a78bfa" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    </Box>
  );
};

export default Logo;
