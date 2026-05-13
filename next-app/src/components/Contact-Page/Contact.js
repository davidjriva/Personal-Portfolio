import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '650px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.3)', mb: 1, display: 'block' }}>
        Contact
      </Typography>

      <Typography
        sx={{
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#e8e6e3',
          mb: 1,
          letterSpacing: '-0.01em',
        }}
      >
        Get in touch
      </Typography>

      <Typography
        sx={{
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.4)',
          mb: 4,
          maxWidth: '400px',
        }}
      >
        Have a question or want to work together? Send me a message.
      </Typography>

      <ContactForm />
    </Box>
  );
};

export default Contact;
