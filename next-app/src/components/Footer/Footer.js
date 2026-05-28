'use client';

import { Box, Typography, IconButton, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#030304',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <ReturnToTopButton />

      <Stack direction="row" spacing={1} alignItems="center">
        <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
          <IconButton
            aria-label="GitHub"
            size="small"
            sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}
          >
            <GitHubIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Link>
        <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
          <IconButton
            aria-label="LinkedIn"
            size="small"
            sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}
          >
            <LinkedInIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Link>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
        }}
      >
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
