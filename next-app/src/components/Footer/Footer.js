'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        py: 4,
        px: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Typography sx={{ color: '#4b5563', fontSize: '0.8rem' }}>
        David Riva &copy; {new Date().getFullYear()}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
          <IconButton size="small" sx={{ color: '#4b5563', '&:hover': { color: '#9ca3af' } }}>
            <GitHubIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Link>
        <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
          <IconButton size="small" sx={{ color: '#4b5563', '&:hover': { color: '#9ca3af' } }}>
            <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Link>

        <Box sx={{ width: '1px', height: 16, bgcolor: 'rgba(255,255,255,0.06)', mx: 1 }} />

        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="small"
          sx={{
            color: '#4b5563',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            width: 32,
            height: 32,
            '&:hover': { color: '#9ca3af', borderColor: 'rgba(255, 255, 255, 0.12)' },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
