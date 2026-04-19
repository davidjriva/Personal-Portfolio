'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#060514',
        color: 'rgba(255, 255, 255, 0.35)',
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
        sx={{
          color: 'rgba(255, 255, 255, 0.35)',
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: 10,
        }}
      >
        David Riva © {new Date().getFullYear()}. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
