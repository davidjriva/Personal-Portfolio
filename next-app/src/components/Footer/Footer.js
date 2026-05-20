'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        width: '100%',
        py: 5,
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>
          David Riva &copy; {new Date().getFullYear()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: 'rgba(255,255,255,0.5)' } }}>
              <GitHubIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: 'rgba(255,255,255,0.5)' } }}>
              <LinkedInIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Link>
        </Box>
      </Box>

      <ReturnToTopButton />
    </Box>
  );
};

export default Footer;
