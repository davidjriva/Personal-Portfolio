'use client';

import { Box, Typography, IconButton, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        color: 'rgba(240, 240, 245, 0.3)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        px: 3,
        gap: 2.5,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          color: 'rgba(240,240,245,0.3)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          width: 36,
          height: 36,
          transition: 'all 0.25s ease',
          '&:hover': {
            color: '#38c0f2',
            borderColor: 'rgba(56,192,242,0.2)',
            background: 'rgba(56,192,242,0.04)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.1rem' }} />
      </IconButton>

      <Stack direction="row" spacing={1}>
        <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
          <IconButton
            aria-label="GitHub"
            size="small"
            sx={{
              color: 'rgba(240,240,245,0.3)',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'rgba(240,240,245,0.7)' },
            }}
          >
            <GitHubIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Link>
        <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
          <IconButton
            aria-label="LinkedIn"
            size="small"
            sx={{
              color: 'rgba(240,240,245,0.3)',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#38c0f2' },
            }}
          >
            <LinkedInIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Link>
      </Stack>

      <Typography sx={{ fontSize: '0.7rem', color: 'rgba(240,240,245,0.2)', textAlign: 'center' }}>
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
