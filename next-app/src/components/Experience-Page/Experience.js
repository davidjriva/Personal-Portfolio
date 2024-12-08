import { Box } from '@mui/material';
import ExperienceTimeLine from './ExperienceTimeLine';
import SectionHeading from '@/components/SectionHeading';

const Experience = () => {
  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <SectionHeading sectionName="Experience" />

      <Box
        sx={{
          marginTop: 10,
        }}
      >
        <ExperienceTimeLine />
      </Box>
    </Box>
  );
};

export default Experience;
