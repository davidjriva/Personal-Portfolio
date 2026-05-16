import { Typography } from '@mui/material';

const SectionHeading = ({ sectionName }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: '2rem', md: '2.5rem' },
        fontWeight: 700,
        color: '#f0ede6',
        mb: 4,
        letterSpacing: '-0.02em',
        textAlign: 'left',
      }}
    >
      {sectionName}
    </Typography>
  );
};

export default SectionHeading;
