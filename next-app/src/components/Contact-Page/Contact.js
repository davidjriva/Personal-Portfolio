'use client';

import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '700px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#38c0f2',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        Contact
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          mb: 1,
        }}
      >
        Let&apos;s work together.
      </Typography>
      <Typography sx={{ fontSize: '1rem', color: '#52525b', mb: 5, letterSpacing: '-0.01em' }}>
        Have a project in mind or just want to say hello? I&apos;d love to hear from you.
      </Typography>

      <ContactForm />
    </Box>
  );
};

export default Contact;
