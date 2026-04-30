import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '600px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="Contact" subtitle="Get in touch" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
