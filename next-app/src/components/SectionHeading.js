import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box sx={{ mb: { xs: 5, md: 6 } }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: '#fafafa',
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {sectionName}
      </Typography>
      <Box
        sx={{
          mt: 2,
          width: 40,
          height: 3,
          borderRadius: '2px',
          background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
        }}
      />
    </Box>
  );
};

export default SectionHeading;
