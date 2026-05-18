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
        gap: 1.5,
      }}
    >
      <ResumeButton />
      <SocialLinks />
    </Box>
  );
};

export default AboutFooter;
