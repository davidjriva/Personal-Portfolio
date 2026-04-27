import { Box, Typography } from '@mui/material';
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
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <SectionHeading sectionName="Contact" />

      <Typography
        sx={{
          color: 'rgba(240,240,245,0.45)',
          fontSize: '0.9rem',
          textAlign: 'center',
          mb: 4,
          maxWidth: '420px',
          px: 2,
          lineHeight: 1.7,
        }}
      >
        Have a question or want to work together? Drop me a message.
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '560px',
          px: { xs: 2, sm: 3 },
        }}
      >
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
