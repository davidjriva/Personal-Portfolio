import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SectionHeading from '@/components/SectionHeading';

const NewAbout = () => {
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
      <SectionHeading sectionName={'About'} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
        }}
      >
        <HeadShotImage width={400} height={400} />

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <AboutHeader />

          <Biography />

          <AboutFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default NewAbout;
