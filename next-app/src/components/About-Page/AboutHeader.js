import { Typography } from '@mui/material';
import ClickableLink from './ClickableLink';

const AboutHeader = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          marginBottom: 1,
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '2.5rem' },
        }}
      >
        David Riva
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: '#38c0f2',
          marginBottom: 1,
        }}
      >
        Technical Trainer
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.55)',
          marginBottom: 2,
        }}
      >
        Bay Area, CA. | <ClickableLink link="mailto:davidjriva@gmail.com" text="davidjriva@gmail.com" />
      </Typography>
    </>
  );
};

export default AboutHeader;
