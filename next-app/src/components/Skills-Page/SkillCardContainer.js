import { Typography, Box } from '@mui/material';
import SkillCard from '@/components/Skills-Page/SkillCard';

const SkillCardContainer = ({ title, items }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h6" align="center">
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <SkillCard title={title} items={items} />
      </Box>
    </Box>
  );
};

export default SkillCardContainer;
