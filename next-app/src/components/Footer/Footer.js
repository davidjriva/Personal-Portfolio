'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        bgcolor: '#09090b',
        px: { xs: 3, md: 6 },
        py: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: '1100px',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ color: '#3f3f46', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} David Riva
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
            <IconButton sx={{ color: '#3f3f46', fontSize: '1.1rem', '&:hover': { color: '#71717a' } }}>
              <GitHubIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
            <IconButton sx={{ color: '#3f3f46', fontSize: '1.1rem', '&:hover': { color: '#38bdf8' } }}>
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              color: '#3f3f46',
              fontSize: '1.1rem',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              ml: 1,
              width: 32,
              height: 32,
              transition: 'all 0.2s ease',
              '&:hover': { color: '#71717a', borderColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <KeyboardArrowUpIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
