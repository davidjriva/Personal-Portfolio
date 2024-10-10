'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ViewWorkButton from '@/components/Greeting-Page/ViewWorkButton';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';

const Greeting = () => {
  return (
    <Box
      sx={{
        color: 'white',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Typography variant="h1">
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>

      <AnimatedTypingTypography />

      <ViewWorkButton />
    </Box>
  );
};

export default Greeting;
