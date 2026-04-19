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
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        maxWidth: '600px',
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
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 6 },
        width: '100%',
        minHeight: '750px',
        pt: '60px',
        pb: '60px',
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          p: '3px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38c0f2, #6e40c9)',
          flexShrink: 0,
          width: 286,
          height: 286,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ borderRadius: '50%', overflow: 'hidden', bgcolor: '#0b0920', width: 280, height: 280 }}>
          <HeadShotImage width={280} height={280} />
        </Box>
      </Box>

      <AboutTextSection />

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          '@media (max-width: 1250px)': { display: 'none' },
        }}
      >
        <SimpleTimeline />
      </Box>
    </Box>
  );
};

export default About;
