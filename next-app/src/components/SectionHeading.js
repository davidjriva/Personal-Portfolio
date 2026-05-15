import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="caption"
        sx={{
          color: '#d4a053',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          mb: 1.5,
          display: 'block',
        }}
      >
        {sectionName.toUpperCase()}
      </Typography>
      {subtitle && (
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#e8e6e3',
            fontSize: { xs: '2rem', md: '2.75rem' },
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
