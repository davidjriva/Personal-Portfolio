import { Box } from '@mui/material';
import SocialLinks from './SocialLinks';
import ResumeButton from './ResumeButton';

const AboutFooter = () => {
  return (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <ResumeButton />
      <SocialLinks />
    </Box>
  );
};

export default AboutFooter;
