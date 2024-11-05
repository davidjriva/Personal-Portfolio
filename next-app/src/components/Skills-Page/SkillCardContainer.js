import { Typography, Box } from '@mui/material';
import AdvancedSkillCard from '@/components/Skills-Page/AdvancedSkillCard';

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
        {items.map((item) => (
          <AdvancedSkillCard key={item} item={item} parent={title}/>
        ))}
      </Box>
    </Box>
  );
};

export default SkillCardContainer;
