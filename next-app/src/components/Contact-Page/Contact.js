import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '700px',
        mx: 'auto',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <SectionHeading sectionName="Get in Touch" />
      <ContactForm />
    </Box>
  );
};

export default Contact;
