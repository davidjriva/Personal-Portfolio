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
            color: '#52525b',
            fontSize: '1.5rem',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#fafafa', bgcolor: 'transparent' },
          }}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          aria-label="LinkedIn Profile"
          sx={{
            color: '#52525b',
            fontSize: '1.5rem',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#38bdf8', bgcolor: 'transparent' },
          }}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
