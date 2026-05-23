'use client';

import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: { xs: 4, md: 5 },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'text.secondary',
          }}
        >
          &copy; {new Date().getFullYear()} David Riva
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            component="a"
            href="https://github.com/davidjriva"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: '#fafafa' } }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/david-riva/"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: '#0a66c2' } }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:davidjriva@gmail.com"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>

          <ScrollLink to="hero" smooth duration={600}>
            <IconButton
              size="small"
              sx={{
                ml: 1,
                color: 'text.secondary',
                border: '1px solid rgba(255,255,255,0.08)',
                '&:hover': { color: 'primary.main', borderColor: 'rgba(56, 189, 248, 0.3)' },
              }}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          </ScrollLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
