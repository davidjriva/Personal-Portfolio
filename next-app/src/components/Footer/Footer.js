'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        width: '100%',
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        padding: '1rem',
      }}
    >
      <ReturnToTopButton />

      <Typography
        variant="body2"
        color="white"
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
