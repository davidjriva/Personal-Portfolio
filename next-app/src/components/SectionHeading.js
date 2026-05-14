import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#fafafa',
          textAlign: 'center',
        }}
      >
        {sectionName}
      </Typography>
      <Box
        sx={{
          width: 48,
          height: 3,
          background: 'linear-gradient(90deg, #38c0f2, #a78bfa)',
          borderRadius: 2,
          mx: 'auto',
          mt: 2.5,
        }}
      />
      {subtitle && (
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.4)', mt: 2.5, textAlign: 'center', maxWidth: 520, mx: 'auto' }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeading;
