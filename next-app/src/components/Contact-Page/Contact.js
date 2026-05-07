import { Box, Typography, Stack } from '@mui/material';
import ContactForm from './ContactForm';
import SectionHeading from '../SectionHeading';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';

const InfoItem = ({ icon, label, value, href }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        bgcolor: 'rgba(96, 165, 250, 0.06)',
        border: '1px solid rgba(96, 165, 250, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontSize: '0.72rem', color: '#6b6b80', fontWeight: 500 }}>{label}</Typography>
      {href ? (
        <Typography
          component="a"
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          sx={{
            fontSize: '0.88rem',
            color: '#a0a0b0',
            textDecoration: 'none',
            '&:hover': { color: '#60a5fa' },
            transition: 'color 0.2s',
          }}
        >
          {value}
        </Typography>
      ) : (
        <Typography sx={{ fontSize: '0.88rem', color: '#a0a0b0' }}>{value}</Typography>
      )}
    </Box>
  </Box>
);

const Contact = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="Contact" title="Get in touch" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
          gap: { xs: 4, md: 5 },
          alignItems: 'start',
        }}
      >
        {/* Info side */}
        <Box>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
            Have a project in mind or want to connect? I&apos;d love to hear from you. Send me a message and
            I&apos;ll get back to you as soon as possible.
          </Typography>
          <Stack spacing={2.5}>
            <InfoItem
              icon={<EmailIcon sx={{ fontSize: '1.1rem', color: '#60a5fa' }} />}
              label="Email"
              value="davidjriva@gmail.com"
              href="mailto:davidjriva@gmail.com"
            />
            <InfoItem
              icon={<LocationOnIcon sx={{ fontSize: '1.1rem', color: '#60a5fa' }} />}
              label="Location"
              value="Bay Area, CA"
            />
            <InfoItem
              icon={<GitHubIcon sx={{ fontSize: '1.1rem', color: '#60a5fa' }} />}
              label="GitHub"
              value="github.com/davidjriva"
              href="https://github.com/davidjriva"
            />
          </Stack>
        </Box>

        {/* Form side */}
        <ContactForm />
      </Box>
    </Box>
  );
};

export default Contact;
