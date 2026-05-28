import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: 'primary.main',
          mb: 1.5,
          fontSize: '0.7rem',
        }}
      >
        {sectionName}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: '#fafafa',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
