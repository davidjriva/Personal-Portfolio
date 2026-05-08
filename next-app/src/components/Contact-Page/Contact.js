import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';
import SocialLinks from '../About-Page/SocialLinks';

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="Get In Touch" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '320px' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#F4F4F5',
              mb: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            Let&apos;s connect
          </Typography>
          <Typography sx={{ color: '#71717A', lineHeight: 1.7, mb: 3, fontSize: '0.9rem' }}>
            Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you. Drop me a
            message and I&apos;ll get back to you as soon as I can.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <SocialLinks />
          </Box>
        </Box>

        <Box sx={{ flex: 1, maxWidth: '560px', width: '100%' }}>
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
