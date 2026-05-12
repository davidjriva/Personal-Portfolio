import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box
      sx={{
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textAlign: 'center',
          background: 'linear-gradient(180deg, #fafafa 0%, #71717a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
