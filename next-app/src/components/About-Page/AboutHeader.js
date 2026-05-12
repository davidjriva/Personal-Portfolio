import { Typography, Box } from '@mui/material';

const AboutHeader = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 0.5,
          fontSize: { xs: '1.5rem', md: '1.75rem' },
          letterSpacing: '-0.02em',
        }}
      >
        David Riva
      </Typography>

      <Typography
        variant="body1"
        sx={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
          fontSize: '0.95rem',
          mb: 0.5,
        }}
      >
        Training Engineer, Generative AI
      </Typography>

      <Typography
        sx={{
          color: '#71717a',
          fontSize: '0.85rem',
        }}
      >
        Bay Area, CA
      </Typography>
    </Box>
  );
};

export default AboutHeader;
