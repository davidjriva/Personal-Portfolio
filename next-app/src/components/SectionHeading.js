import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#818cf8',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          mb: 1.5,
        }}
      >
        {sectionName.toUpperCase()}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          lineHeight: 1.1,
          color: '#fafafa',
        }}
      >
        {sectionName}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            mt: 2,
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '1rem',
            maxWidth: '500px',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
