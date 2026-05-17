import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: '#38c0f2',
          fontSize: '0.75rem',
          letterSpacing: '0.16em',
          fontWeight: 600,
        }}
      >
        {sectionName}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textAlign: 'center',
          color: '#f0f0f5',
        }}
      >
        {subtitle || sectionName}
      </Typography>
      <Box
        sx={{
          width: 48,
          height: 3,
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #38c0f2, #6e40c9)',
          mt: 0.5,
        }}
      />
    </Box>
  );
};

export default SectionHeading;
