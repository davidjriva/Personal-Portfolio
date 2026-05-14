import { Typography, Box } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 0.5,
          fontSize: { xs: '1.75rem', sm: '2rem' },
          letterSpacing: '-0.02em',
          color: '#fafafa',
        }}
      >
        David Riva
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: '#38c0f2',
          fontWeight: 600,
          mb: 1,
          fontSize: '1rem',
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.35)',
          fontSize: '0.88rem',
        }}
      >
        Bay Area, CA &middot; <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </Box>
  );
};

export default AboutHeader;
