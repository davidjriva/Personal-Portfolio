'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SectionHeading from '../SectionHeading';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <Box>
      <SectionHeading sectionName="Contact" subtitle="Get in touch" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        {/* Left: CTA */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
            Have a project in mind, want to collaborate, or just want to say hello? I&apos;d love to hear from you.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmailOutlinedIcon sx={{ color: '#00d4ff', fontSize: '1.1rem' }} />
            <Typography
              component="a"
              href="mailto:davidjriva@gmail.com"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: '#00d4ff' },
              }}
            >
              davidjriva@gmail.com
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
              <IconButton
                aria-label="GitHub"
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  width: 36,
                  height: 36,
                  '&:hover': { color: '#e8e8ed', borderColor: 'rgba(255,255,255,0.15)' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
              <IconButton
                aria-label="LinkedIn"
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  width: 36,
                  height: 36,
                  '&:hover': { color: '#0a66c2', borderColor: 'rgba(10,102,194,0.2)' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Link>
          </Box>
        </Box>

        {/* Right: Form */}
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
