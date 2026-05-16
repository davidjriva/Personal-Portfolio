'use client';

import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        px: { xs: 3, md: 6 },
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '80px', md: '120px' },
      }}
    >
      {/* Section heading */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: '#f0ede6',
          mb: 1,
          letterSpacing: '-0.02em',
        }}
      >
        Get in Touch
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(240, 237, 230, 0.5)',
          mb: 6,
          fontSize: '1rem',
        }}
      >
        Have a project in mind? Let&apos;s talk.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          width: '100%',
        }}
      >
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
