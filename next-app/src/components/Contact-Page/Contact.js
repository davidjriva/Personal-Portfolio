import { Box } from '@mui/material';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '750px',
        pt: '80px',
        pb: '80px',
        borderTop: '8px solid rgba(0,0,0,0.1)',
      }}
    >
      <ContactForm />
    </Box>
  );
};

export default Contact;
