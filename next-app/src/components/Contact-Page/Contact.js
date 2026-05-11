'use client';

import { Box, Typography, Link } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Get in Touch" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.7 }}>
            Interested in working together or have a question? I&apos;d love to hear from you. Send me a message and
            I&apos;ll get back to you as soon as possible.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  mb: 0.75,
                }}
              >
                Email
              </Typography>
              <Link
                href="mailto:davidjriva@gmail.com"
                sx={{
                  color: '#8b5cf6',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <EmailIcon sx={{ fontSize: '1.1rem' }} />
                davidjriva@gmail.com
              </Link>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  mb: 0.75,
                }}
              >
                Social
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link
                  href="https://github.com/davidjriva"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#f5f5f7', borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 20 }} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/david-j-riva"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#f5f5f7', borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 20 }} />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
