'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#030308',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        width: '100%',
        py: 5,
        px: { xs: 3, md: 5 },
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
          gap: 3,
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', fontWeight: 500, order: { xs: 2, sm: 0 } }}>
          © {new Date().getFullYear()} David Riva
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, order: { xs: 1, sm: 1 } }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
            <IconButton
              aria-label="GitHub Profile"
              size="small"
              sx={{
                color: 'rgba(255,255,255,0.3)',
                '&:hover': { color: '#f0f0f5' },
                transition: 'color 0.2s ease',
              }}
            >
              <GitHubIcon sx={{ fontSize: '1.15rem' }} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
            <IconButton
              aria-label="LinkedIn Profile"
              size="small"
              sx={{
                color: 'rgba(255,255,255,0.3)',
                '&:hover': { color: '#38c0f2' },
                transition: 'color 0.2s ease',
              }}
            >
              <LinkedInIcon sx={{ fontSize: '1.15rem' }} />
            </IconButton>
          </Link>
          <Box sx={{ width: 1, height: 16, bgcolor: 'rgba(255,255,255,0.06)' }} />
          <IconButton
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              '&:hover': { color: '#38c0f2', borderColor: 'rgba(56,192,242,0.2)' },
              transition: 'all 0.2s ease',
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
