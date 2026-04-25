import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        pt: { xs: '60px', md: '80px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SectionHeading sectionName="Get in Touch" />

      <Box sx={{ width: '100%', maxWidth: '640px' }}>
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
