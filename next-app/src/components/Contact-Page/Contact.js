import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <SectionHeading sectionName="Contact" subtitle="Let's connect." />
      <Box sx={{ maxWidth: '600px' }}>
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
