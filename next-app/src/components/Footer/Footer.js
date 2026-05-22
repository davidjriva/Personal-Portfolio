'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#04040a',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <ReturnToTopButton />
      <Typography
        sx={{
          color: '#27272a',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}
      >
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
