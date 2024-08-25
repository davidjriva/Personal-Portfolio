import { Box, Typography } from '@mui/material';

const ExperienceCard = ({ title, company, logoImage, location, startDate, endDate, bulletPoints }) => {
  return (
    <Box sx={{ marginBottom: '2rem', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h5" sx={{ color: '#000' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#0a73c9', textAlign: 'right' }}>
          {startDate} - {endDate}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <img
          src={`/images/${logoImage}`}
          alt={`${company} logo`}
          style={{ height: '24px', marginRight: '8px', alignSelf: 'center' }}
        />
        <Typography variant="body1">
          {company} | {location}
        </Typography>
      </Box>
      {bulletPoints.map((bulletPt, index) => (
        <Typography key={index} variant="body1">
          • {bulletPt}
        </Typography>
      ))}
    </Box>
  );
};

export default ExperienceCard;
