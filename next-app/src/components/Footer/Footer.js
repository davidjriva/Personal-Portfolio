'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#0a0a0b',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        width: '100%',
        py: 6,
        px: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: 'rgba(240, 237, 232, 0.3)', fontSize: '0.8rem' }}
      >
        {new Date().getFullYear()} David Riva
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
          <IconButton
            aria-label="GitHub"
            sx={{
              color: 'rgba(240, 237, 232, 0.4)',
              '&:hover': { color: '#f0ede8' },
            }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Link>
        <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
          <IconButton
            aria-label="LinkedIn"
            sx={{
              color: 'rgba(240, 237, 232, 0.4)',
              '&:hover': { color: '#f0ede8' },
            }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Link>
      </Box>

      <Box
        component="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          background: 'none',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(240, 237, 232, 0.4)',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#f0ede8',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <KeyboardArrowUpIcon fontSize="small" />
      </Box>
    </Box>
  );
};

export default Footer;
