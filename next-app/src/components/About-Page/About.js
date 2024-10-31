import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';

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
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <HeadShotImage width={100} height={100} />
      <AboutTextSection />
    </Box>
  );
};

export default About;
