'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        bgcolor: '#09090b',
        py: 4,
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
          David Riva &copy; {new Date().getFullYear()}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
            <IconButton
              size="small"
              aria-label="GitHub"
              sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#fafafa' } }}
            >
              <GitHubIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
            <IconButton
              size="small"
              aria-label="LinkedIn"
              sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#38c0f2' } }}
            >
              <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Link>
          <Link href="mailto:davidjriva@gmail.com">
            <IconButton
              size="small"
              aria-label="Email"
              sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#a78bfa' } }}
            >
              <EmailIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Link>
        </Box>

        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="small"
          aria-label="Back to top"
          sx={{
            color: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
