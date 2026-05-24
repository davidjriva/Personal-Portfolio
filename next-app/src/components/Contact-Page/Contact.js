import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Contact" subtitle="Get in touch" />
      <Typography sx={{ textAlign: 'center', color: '#52525b', fontSize: '0.85rem', mb: 5, mt: -4 }}>
        Have a question or want to work together? Send me a message.
      </Typography>
      <ContactForm />
    </Box>
  );
};

export default Contact;
