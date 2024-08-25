import { Typography, Box } from '@mui/material';

const AwardCard = ({ title, description, date }) => {
  return (
    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h5" sx={{ color: '#000' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
        {description}
      </Typography>
      <Typography variant="body2" sx={{ color: '#0a73c9' }}>
        {date}
      </Typography>
    </Box>
  );
};

export default AwardCard;
