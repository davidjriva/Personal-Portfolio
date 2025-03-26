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
        justifyContent: 'center',
        width: '100%',
        minHeight: '750px',
        pt: '80px',
        pb: '80px',
        borderTop: '8px solid rgba(0,0,0,0.1)',
      }}
    >
      <SectionHeading sectionName="Contact Me" />

      <ContactForm />
    </Box>
  );
};

export default Contact;
