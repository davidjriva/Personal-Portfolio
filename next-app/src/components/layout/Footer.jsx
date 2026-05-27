'use client';

import { Box, Typography, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: 5,
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
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} David Riva. Built with Next.js & MUI.
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            component="a"
            href="https://github.com/davidjriva"
            target="_blank"
            rel="noopener"
            size="small"
            sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#fafafa' } }}
          >
            <GitHubIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/david-j-riva"
            target="_blank"
            rel="noopener"
            size="small"
            sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#fafafa' } }}
          >
            <LinkedInIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.3)',
              ml: 1,
              border: '1px solid rgba(255,255,255,0.08)',
              '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.15)' },
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
