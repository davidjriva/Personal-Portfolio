'use client';

import { Box, Typography, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 4,
        px: { xs: 2, md: 4 },
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
        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
          David Riva &copy; {new Date().getFullYear()}
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            href="https://github.com/davidjriva"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            href="https://linkedin.com/in/davidjriva"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            href="mailto:davidjriva@gmail.com"
            aria-label="Email"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        </Stack>

        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          sx={{
            color: 'text.secondary',
            border: '1px solid rgba(255,255,255,0.08)',
            width: 36,
            height: 36,
            '&:hover': { color: 'text.primary', borderColor: 'rgba(255,255,255,0.15)' },
          }}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
