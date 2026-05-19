import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SectionHeading sectionName="Contact" subtitle="Have a question or want to work together? Reach out." />
      <ContactForm />
    </Box>
  );
};

export default Contact;
