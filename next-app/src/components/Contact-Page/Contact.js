import Image from 'next/image';
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
        pt: '80px',
        pb: '80px',
      }}
    >
      <SectionHeading sectionName="Contact Me" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: {
            xs: '75%', // mobile
            sm: '70%', // tablets
            md: '70%', // small desktops
            lg: '70%', // large desktops
          },
        }}
      >
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
