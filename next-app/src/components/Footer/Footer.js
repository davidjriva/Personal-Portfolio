'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#262624' : '#f8f9fa',
        color: 'text.primary',
        width: '100%',
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        mt: 0,
        pt: '1rem',
        pb: '1rem',
      }}
    >
      <ReturnToTopButton />

      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          textAlign: 'center',
          marginTop: '1rem', // Add top margin for spacing
          marginBottom: 10,
        }}
      >
        David Riva © {new Date().getFullYear()}. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
