import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '2.25rem', md: '3.25rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textAlign: 'center',
          background: 'linear-gradient(180deg, #f5f5f7 0%, rgba(255,255,255,0.55) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {sectionName}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', mt: 1.5, textAlign: 'center', maxWidth: 500 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
