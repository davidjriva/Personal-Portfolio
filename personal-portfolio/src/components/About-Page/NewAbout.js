import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';

const PersonOutlineIcon = () => {
  return (
    <img
      src="/images/person-outline.svg"
      alt="Person"
      style={{
        width: '25vw',
        height: 'auto',
        marginRight: '20px', // Add space between image and text
      }}
    />
  );
};

const NewAbout = () => {
  return (
    <Box
      id="about-section"
      sx={{
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        padding: 2,
        textAlign: 'left',
        bgcolor: '#282829',
      }}
    >
      <HeadShotImage width={400} height={400} />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <AboutHeader />

        <Biography />

        <AboutFooter />
      </Box>
    </Box>
  );
};

export default NewAbout;
