'use client';

import { Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialLinks = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          aria-label="GitHub Profile"
          sx={{
            color: '#71717a',
            fontSize: '28px',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#fafafa' },
          }}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          aria-label="LinkedIn Profile"
          sx={{
            color: '#71717a',
            fontSize: '28px',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#3b82f6' },
          }}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
