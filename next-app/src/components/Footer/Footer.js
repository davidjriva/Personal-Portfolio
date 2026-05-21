'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        py: 5,
        px: { xs: 3, md: 5 },
        maxWidth: '1200px',
        mx: 'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>
          David Riva &copy; {new Date().getFullYear()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#e8e6e3' }, display: 'flex' }}>
            <GitHubIcon sx={{ fontSize: '1.1rem' }} />
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#e8e6e3' }, display: 'flex' }}>
            <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
          </Link>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              ml: 1,
              color: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              width: 32,
              height: 32,
              '&:hover': { color: '#e8e6e3', borderColor: 'rgba(255,255,255,0.15)' },
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
