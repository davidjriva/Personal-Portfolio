'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#09090b',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.2)',
            fontSize: '0.78rem',
          }}
        >
          &copy; {new Date().getFullYear()} David Riva
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
            <IconButton
              aria-label="GitHub"
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { color: 'rgba(255, 255, 255, 0.5)' },
              }}
            >
              <GitHubIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
            <IconButton
              aria-label="LinkedIn"
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { color: 'rgba(255, 255, 255, 0.5)' },
              }}
            >
              <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <ReturnToTopButton />
    </Box>
  );
};

export default Footer;
