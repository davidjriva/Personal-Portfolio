import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '700px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 10, md: 15 },
      }}
    >
      <SectionHeading sectionName="Contact" subtitle="Let's connect" />

      <Typography
        sx={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.95rem',
          mb: 5,
          mt: -4,
          lineHeight: 1.7,
        }}
      >
        Have a project in mind or want to chat? Send me a message and I&apos;ll get back to you.
      </Typography>

      <ContactForm />
    </Box>
  );
};

export default Contact;
