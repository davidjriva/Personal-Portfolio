import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box sx={{ mb: { xs: 5, md: 6 }, pt: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: '#fafafa',
          fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textAlign: { xs: 'center', md: 'left' },
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {sectionName}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-8px',
            left: { xs: '50%', md: 0 },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #818cf8, #c084fc)',
            borderRadius: '2px',
          }}
        />
      </Typography>
    </Box>
  );
};

export default SectionHeading;
