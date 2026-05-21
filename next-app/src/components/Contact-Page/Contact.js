import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '700px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="Contact" />

      <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.7, mb: 4, maxWidth: 480 }}>
        Interested in working together or have a question? Send me a message and I&apos;ll get back to you.
      </Typography>

      <ContactForm />
    </Box>
  );
};

export default Contact;
