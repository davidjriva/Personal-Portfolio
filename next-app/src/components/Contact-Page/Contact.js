'use client';

import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';
import RevealOnScroll from '@/components/RevealOnScroll';

const Contact = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
      <SectionHeading sectionName="Contact" />

      <Typography sx={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', mb: 6, maxWidth: 500, mx: 'auto' }}>
        Have a project in mind or want to chat? Send me a message and I&apos;ll get back to you.
      </Typography>

      <RevealOnScroll sx={{ maxWidth: 640, mx: 'auto' }}>
        <ContactForm />
      </RevealOnScroll>
    </Box>
  );
};

export default Contact;
