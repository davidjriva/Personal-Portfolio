import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialLinks = () => {
  return (
    <Box>
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
        <IconButton sx={{ color: '#4A4A4A', fontSize: '40px' }}>
          {' '}
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton sx={{ color: '#4A4A4A', fontSize: '40px' }}>
          {' '}
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
