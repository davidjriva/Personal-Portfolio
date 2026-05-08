import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';
import SectionHeading from '@/components/SectionHeading';

const AboutTextSection = () => {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        maxWidth: '600px',
        flex: 1,
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
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="About" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              p: '2px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818CF8, #C084FC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                overflow: 'hidden',
                bgcolor: '#09090B',
                width: 200,
                height: 200,
              }}
            >
              <HeadShotImage width={200} height={200} />
            </Box>
          </Box>
        </Box>

        <AboutTextSection />

        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            flexShrink: 0,
          }}
        >
          <SimpleTimeline />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
