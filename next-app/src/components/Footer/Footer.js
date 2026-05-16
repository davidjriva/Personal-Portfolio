'use client';

import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        px: { xs: 3, md: 6 },
        py: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Left: copyright */}
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(240, 237, 230, 0.35)',
          fontSize: '0.8rem',
          order: { xs: 3, md: 1 },
        }}
      >
        &copy; 2026 David Riva
      </Typography>

      {/* Center: social links */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          order: { xs: 1, md: 2 },
        }}
      >
        <MuiLink href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
          <IconButton
            aria-label="GitHub"
            size="small"
            sx={{
              color: 'rgba(240, 237, 230, 0.4)',
              '&:hover': { color: '#f0ede6' },
            }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </MuiLink>
        <MuiLink href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
          <IconButton
            aria-label="LinkedIn"
            size="small"
            sx={{
              color: 'rgba(240, 237, 230, 0.4)',
              '&:hover': { color: '#f0ede6' },
            }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </MuiLink>
      </Box>

      {/* Right: built with */}
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(240, 237, 230, 0.35)',
          fontSize: '0.8rem',
          order: { xs: 2, md: 3 },
        }}
      >
        Built with Next.js
      </Typography>
    </Box>
  );
};

export default Footer;
