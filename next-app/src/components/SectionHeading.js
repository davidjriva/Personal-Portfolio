import { Box, Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#38c0f2',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {sectionName}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
