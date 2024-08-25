import { Typography } from '@mui/material';

const SkillCard = ({ title, items }) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#000' }}>
        {title}
      </Typography>

      <Typography variant="body1">
        {items.join(', ')}
      </Typography>
    </>
  );
};

export default SkillCard;

