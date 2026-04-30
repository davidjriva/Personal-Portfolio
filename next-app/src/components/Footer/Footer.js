'use client';

import { Box, Typography, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.06)',
          color: '#52525b',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.12)',
            color: '#a1a1aa',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <KeyboardArrowUpIcon fontSize="small" />
      </IconButton>

      <Typography sx={{ fontSize: '0.75rem', color: '#3f3f46' }}>
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
