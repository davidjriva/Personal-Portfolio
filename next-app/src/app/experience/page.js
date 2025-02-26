import { Box } from '@mui/material';
import ExperienceTimeLine from '@/components/Experience-Page/ExperienceTimeLine';
import ChildPageNavBar from '@/components/Navbars/ExperiencePageNavBar';

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
        <ExperienceTimeLine />
      </Box>
    </Box>
  );
};
export default ExperiencePage;
