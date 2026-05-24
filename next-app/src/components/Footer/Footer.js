'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 4,
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          color: '#52525b',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          width: 36,
          height: 36,
          transition: 'all 0.2s ease',
          '&:hover': { color: '#a1a1aa', borderColor: 'rgba(255,255,255,0.15)' },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.1rem' }} />
      </IconButton>

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" sx={{ color: '#3f3f46', transition: 'color 0.2s', '&:hover': { color: '#a1a1aa' } }}>
          <GitHubIcon sx={{ fontSize: '1.1rem' }} />
        </Link>
        <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" sx={{ color: '#3f3f46', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
          <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
        </Link>
      </Box>

      <Typography sx={{ color: '#27272a', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em' }}>
        {new Date().getFullYear()} David Riva
      </Typography>
    </Box>
  );
};

export default Footer;
