'use client';

import { Box, Typography, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        px: { xs: 3, md: 6 },
        py: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        component="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '12px',
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)',
          transition: 'all 0.25s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.08)',
            color: '#fafafa',
            borderColor: 'rgba(255,255,255,0.15)',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          component="a"
          href="https://github.com/davidjriva"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#fafafa' } }}
        >
          <GitHubIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/david-j-riva"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#38bdf8' } }}
        >
          <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>

      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
