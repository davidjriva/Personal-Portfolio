'use client';

import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ReturnToTopButton from './ReturnToTopButton';

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <ReturnToTopButton />

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {[
          { icon: <GitHubIcon sx={{ fontSize: '1.1rem' }} />, href: 'https://github.com/davidjriva', label: 'GitHub' },
          { icon: <LinkedInIcon sx={{ fontSize: '1.1rem' }} />, href: 'https://www.linkedin.com/in/david-j-riva', label: 'LinkedIn' },
          { icon: <EmailOutlinedIcon sx={{ fontSize: '1.1rem' }} />, href: 'mailto:davidjriva@gmail.com', label: 'Email' },
        ].map((social) => (
          <Link key={social.label} href={social.href} target={social.label !== 'Email' ? '_blank' : undefined} rel="noopener">
            <IconButton
              aria-label={social.label}
              sx={{
                color: 'rgba(255,255,255,0.3)',
                width: 36,
                height: 36,
                transition: 'color 0.2s ease',
                '&:hover': { color: 'rgba(255,255,255,0.7)' },
              }}
            >
              {social.icon}
            </IconButton>
          </Link>
        ))}
      </Box>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.2)',
          fontSize: '0.78rem',
          textAlign: 'center',
        }}
      >
        David Riva &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
