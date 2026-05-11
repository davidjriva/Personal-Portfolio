'use client';

import { Box, Typography } from '@mui/material';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', fontWeight: 400 }}>
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
      <ReturnToTopButton />
    </Box>
  );
};

export default Footer;
