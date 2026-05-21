import { Box, Typography } from '@mui/material';

const SectionHeading = ({ label }) => {
  return (
    <Box sx={{ mb: { xs: 5, md: 7 } }}>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#a78bfa',
          mb: 1.5,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: 32,
          height: 2,
          borderRadius: '1px',
          background: 'linear-gradient(90deg, #a78bfa, transparent)',
        }}
      />
    </Box>
  );
};

export default SectionHeading;
