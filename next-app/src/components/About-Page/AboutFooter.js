import { Box } from '@mui/material';
import SocialLinks from './SocialLinks';
import ResumeButton from './ResumeButton';

const AboutFooter = () => {
  return (
    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
      <ResumeButton />
      <SocialLinks />
    </Box>
  );
};

export default AboutFooter;
