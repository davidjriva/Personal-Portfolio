import { Typography, Box } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 0.75,
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          letterSpacing: '-0.02em',
          color: '#F4F4F5',
        }}
      >
        David Riva
      </Typography>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '1rem',
          mb: 0.75,
          background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography sx={{ color: '#52525B', fontSize: '0.875rem' }}>
        Bay Area, CA &middot; <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </Box>
  );
};

export default AboutHeader;
