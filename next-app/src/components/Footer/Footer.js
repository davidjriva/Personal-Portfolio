'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#09090B',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
      }}
    >
      <ReturnToTopButton />
      <Typography
        variant="body2"
        sx={{
          color: '#3F3F46',
          textAlign: 'center',
          mt: 2,
          fontSize: '0.78rem',
        }}
      >
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
