'use client';

import { Box, Typography, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const FooterLink = ({ href, icon }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      width: 36,
      height: 36,
      borderRadius: '10px',
      bgcolor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b6b80',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: '#a0a0b0',
      },
    }}
  >
    {icon}
  </Box>
);

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#06060a',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        py: 5,
        px: { xs: 3, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Typography sx={{ fontSize: '0.82rem', color: '#6b6b80', fontWeight: 400 }}>
          {new Date().getFullYear()} David Riva. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={1}>
          <FooterLink href="https://github.com/davidjriva" icon={<GitHubIcon sx={{ fontSize: '1rem' }} />} />
          <FooterLink
            href="https://www.linkedin.com/in/david-j-riva"
            icon={<LinkedInIcon sx={{ fontSize: '1rem' }} />}
          />
          <FooterLink href="mailto:davidjriva@gmail.com" icon={<EmailIcon sx={{ fontSize: '1rem' }} />} />
        </Stack>

        <Box
          component="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            background: 'none',
            border: 'none',
            color: '#6b6b80',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            transition: 'color 0.2s ease',
            '&:hover': { color: '#a0a0b0' },
          }}
        >
          Back to top
          <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
