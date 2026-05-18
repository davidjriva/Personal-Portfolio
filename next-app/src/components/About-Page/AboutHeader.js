import { Typography, Box } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          letterSpacing: '-0.03em',
          mb: 0.5,
          color: '#fafafa',
        }}
      >
        David Riva
      </Typography>

      <Typography
        sx={{
          color: '#818cf8',
          fontWeight: 600,
          fontSize: '1.05rem',
          mb: 1,
          letterSpacing: '-0.01em',
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.9rem',
        }}
      >
        Bay Area, CA &middot; <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </Box>
  );
};

export default AboutHeader;
