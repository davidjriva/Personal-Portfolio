import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <SectionHeading sectionName="Get in Touch" />
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.95rem',
          mb: 4,
          maxWidth: '500px',
          lineHeight: 1.6,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Have a question or want to work together? Send me a message and I&apos;ll get back to you.
      </Typography>
      <Box sx={{ maxWidth: '600px', mx: { xs: 'auto', md: 0 } }}>
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
