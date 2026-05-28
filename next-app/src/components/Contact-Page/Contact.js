'use client';

import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <SectionHeading sectionName="Contact" />

      <Typography
        sx={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.9rem',
          textAlign: 'center',
          maxWidth: '480px',
          mb: 4,
          px: 3,
          lineHeight: 1.7,
        }}
      >
        Have a question or want to work together? Send me a message and I&apos;ll get back to you as soon as I can.
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '560px',
          px: { xs: 2, sm: 3 },
        }}
      >
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
