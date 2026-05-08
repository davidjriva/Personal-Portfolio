import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: '#F4F4F5',
          fontSize: { xs: '2rem', md: '2.75rem' },
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #818CF8 0%, #C084FC 100%)',
            borderRadius: '10px',
          },
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
