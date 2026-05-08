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
            color: '#71717A',
            fontSize: '28px',
            transition: 'all 0.2s ease',
            '&:hover': { color: '#F4F4F5', backgroundColor: 'rgba(255, 255, 255, 0.05)' },
          }}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          aria-label="LinkedIn Profile"
          sx={{
            color: '#71717A',
            fontSize: '28px',
            transition: 'all 0.2s ease',
            '&:hover': { color: '#818CF8', backgroundColor: 'rgba(129, 140, 248, 0.08)' },
          }}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
