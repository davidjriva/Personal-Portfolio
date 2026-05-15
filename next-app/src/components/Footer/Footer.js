'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(232, 230, 227, 0.06)',
        color: 'rgba(232, 230, 227, 0.25)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <ReturnToTopButton />
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(232, 230, 227, 0.2)',
          textAlign: 'center',
          fontSize: '0.8rem',
        }}
      >
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
