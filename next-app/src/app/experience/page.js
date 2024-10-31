import { Box } from '@mui/material';
import ExperienceTimeline from '@/components/Experience-Page/ExperienceTimeline';
import ChildPageNavBar from '@/components/ChildPageNavBar';

const ExperiencePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282829',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ChildPageNavBar />
      <Box sx={{ marginTop: 10 }}>
        <ExperienceTimeline />
      </Box>
    </Box>
  );
};
export default ExperiencePage;
