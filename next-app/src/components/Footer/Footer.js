'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        px: { xs: 3, md: 6 },
        py: 4,
        maxWidth: '1100px',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.2)' }}>
          © {new Date().getFullYear()} David Riva
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
            <IconButton
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { color: 'rgba(255, 255, 255, 0.5)' },
              }}
            >
              <GitHubIcon sx={{ fontSize: '0.95rem' }} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
            <IconButton
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { color: 'rgba(255, 255, 255, 0.5)' },
              }}
            >
              <LinkedInIcon sx={{ fontSize: '0.95rem' }} />
            </IconButton>
          </Link>

          <IconButton
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              ml: 1,
              color: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              width: 28,
              height: 28,
              '&:hover': { color: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: '0.9rem' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
