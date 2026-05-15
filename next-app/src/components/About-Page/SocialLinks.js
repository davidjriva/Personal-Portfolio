'use client';

import { Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const iconSx = {
  color: 'rgba(232, 230, 227, 0.35)',
  fontSize: '1.25rem',
  p: 1,
  '&:hover': {
    color: '#e8e6e3',
    bgcolor: 'rgba(232, 230, 227, 0.06)',
  },
};

const SocialLinks = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
        <IconButton aria-label="GitHub Profile" sx={iconSx}>
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton aria-label="LinkedIn Profile" sx={iconSx}>
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
