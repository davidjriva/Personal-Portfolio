import { Typography, Box } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          mb: 0.5,
          fontSize: { xs: '1.3rem', md: '1.5rem' },
          letterSpacing: '-0.015em',
        }}
      >
        David Riva
      </Typography>

      <Typography
        sx={{
          color: '#d4a053',
          fontSize: '0.9rem',
          fontWeight: 500,
          mb: 0.5,
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography
        sx={{
          color: 'rgba(232, 230, 227, 0.4)',
          fontSize: '0.85rem',
        }}
      >
        Bay Area, CA &middot;{' '}
        <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </Box>
  );
};

export default AboutHeader;
