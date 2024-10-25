import { Typography, Box } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        marginTop: { xs: '6rem', sm: '9rem' },
        marginBottom: { xs: '10rem', sm: '13rem' },
        textAlign: 'center',
        zIndex: 9999, 
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '3rem', sm: '5.5rem' }, 
          fontWeight: 700,
          position: 'relative',
        }}
      >
        {sectionName}
      </Typography>

      <Box
        sx={{
          position: 'absolute',
          content: '""',
          borderBottom: {
            xs: '14px solid #ff4d5a',
            sm: '18px solid #ff4d5a',
          },
          width: '22.5rem',
          display: 'block',
          margin: '0 auto',
          left: '3.5rem',
          top: { xs: '4rem', sm: '6.3rem' },
          zIndex: -1,
        }}
      />
    </Box>
  );
};

export default SectionHeading;
