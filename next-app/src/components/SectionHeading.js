import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
          fontWeight: 700,
          color: '#f4f4f5',
          letterSpacing: '-0.03em',
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
