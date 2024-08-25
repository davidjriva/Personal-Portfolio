import { Typography, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const AwardCard = ({ title, description, date }) => {
  return (
    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <EmojiEventsIcon sx={{ color: '#FFD700', marginRight: '0.5rem' }} /> {/* Gold-yellow color */}
        <Typography variant="h5" sx={{ color: '#000' }}>
          {title}
        </Typography>
      </Box>
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
