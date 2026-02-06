'use client';

import React, { useState } from 'react';
import { Box, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialLinks = () => {
  const [hasGitHubIconBeenClicked, setHasGitHubIconBeenClicked] = useState(false);
  const [hasLinkedInIconBeenClicked, setHasLinkedInIconBeenClicked] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          sx={{
            color: hasGitHubIconBeenClicked ? '#9974cf' : 'text.primary',
            fontSize: '40px',
            '&:hover': {
              color: '#a28be5',
            },
            '&:active': {
              color: '#9974cf',
            },
          }}
          onClick={() => setHasGitHubIconBeenClicked(true)}
        >
          {' '}
          <GitHubIcon fontSize="inherit" />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
        <IconButton
          sx={{
            color: hasLinkedInIconBeenClicked ? '#07a2f7' : 'text.primary',
            fontSize: '40px',
            '&:hover': {
              color: '#4abfff',
            },
            '&:active': {
              color: '#07a2f7',
            },
          }}
          onClick={() => setHasLinkedInIconBeenClicked(true)}
        >
          {' '}
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default SocialLinks;
