import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        pt: { xs: '80px', md: '100px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 4, md: 6 },
          mb: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: 200, md: 240 },
            height: { xs: 200, md: 240 },
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <HeadShotImage width={240} height={240} />
        </Box>

        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <AboutHeader />
          <Biography />
          <AboutFooter />
        </Box>
      </Box>

      <SimpleTimeline />
    </Box>
  );
};

export default About;
