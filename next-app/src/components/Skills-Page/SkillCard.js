import { Typography } from '@mui/material';

const SkillCard = ({ items }) => {
  return (
    <>
      <Typography variant="body1">
        {items.join(', ')}
      </Typography>
    </>
  );
};

export default SkillCard;

