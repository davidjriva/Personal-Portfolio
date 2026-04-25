import { Typography, Box } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          fontWeight: 700,
          color: '#fafafa',
          mb: 0.5,
        }}
      >
        David Riva
      </Typography>

      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          color: '#38bdf8',
          mb: 1,
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography sx={{ color: '#52525b', fontSize: '0.875rem' }}>
        Bay Area, CA &middot;{' '}
        <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </Box>
  );
};

export default AboutHeader;
