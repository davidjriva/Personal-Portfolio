import { Box, Typography } from '@mui/material';

const SectionHeading = ({ label, title }) => {
  return (
    <Box sx={{ mb: { xs: 5, md: 7 } }}>
      <Typography variant="overline" sx={{ display: 'block', mb: 1, fontSize: '0.75rem' }}>
        {label}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          color: '#e8e8ed',
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            borderRadius: '4px',
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
