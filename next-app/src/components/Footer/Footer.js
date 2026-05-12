'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#09090b',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        color: '#52525b',
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
        variant="body2"
        sx={{
          color: '#3f3f46',
          textAlign: 'center',
          fontSize: '0.8rem',
        }}
      >
        {new Date().getFullYear()} David Riva
      </Typography>
    </Box>
  );
};

export default Footer;
