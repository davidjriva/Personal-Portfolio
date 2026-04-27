import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
      <Typography
        variant="overline"
        sx={{
          color: '#38c0f2',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        {sectionName}
      </Typography>
      <Box
        sx={{
          width: 32,
          height: 2,
          background: 'linear-gradient(90deg, #38c0f2, #8b5cf6)',
          borderRadius: '1px',
        }}
      />
    </Box>
  );
};

export default SectionHeading;
