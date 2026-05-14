'use client';

import { Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialLinks = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
        <IconButton
          aria-label="GitHub Profile"
          sx={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1.5rem',
            transition: 'all 0.2s ease',
            '&:hover': { color: '#fafafa', bgcolor: 'rgba(255,255,255,0.06)' },
          }}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
        <IconButton
          aria-label="LinkedIn Profile"
          sx={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1.5rem',
            transition: 'all 0.2s ease',
            '&:hover': { color: '#38c0f2', bgcolor: 'rgba(56,192,242,0.08)' },
          }}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
