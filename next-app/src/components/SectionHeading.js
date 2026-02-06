import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box 
      sx={{ 
        mb: '100px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        pt: '40px'
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: 'text.primary',
          fontSize: { xs: '2.5rem', md: '4rem' },
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '4px',
            background: 'linear-gradient(90deg, #38c0f2 0%, #07a2f7 100%)',
            borderRadius: '10px'
          }
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
