import { Typography } from '@mui/material';

const SkillCard = ({ title, items }) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#000' }}>
        {title}
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
        {items.join(',')}
      </Typography>
    </>
  );
};

export default SkillCard;

