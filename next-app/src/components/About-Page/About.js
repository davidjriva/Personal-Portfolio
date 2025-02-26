import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';

const AboutTextSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <AboutHeader />
      <Biography />
      <AboutFooter />
    </Box>
  );
};

const About = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <HeadShotImage width={100} height={100} />
      <AboutTextSection />

      <Box
        sx={{
          marginTop: 10,
          display: { xs: 'none', md: 'block' }, // Hide on small screens, show on larger screens
          '@media (max-width: 1250px)': {
            display: 'none', // Hide when screen width is ≤ 1250px
          },
        }}
      >
        <SimpleTimeline />
      </Box>
    </Box>
  );
};

export default About;
