import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: '#00d4ff',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          mb: 1.5,
        }}
      >
        {sectionName}
      </Typography>
      {subtitle && (
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: '#e8e8ed',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
