import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box
      sx={{
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#e8a838',
          mb: 1.5,
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
        }}
      >
        {sectionName}
      </Typography>
      {subtitle && (
        <Typography
          variant="h2"
          sx={{
            color: '#f0ede8',
            fontSize: { xs: '2rem', md: '2.75rem' },
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
