import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import Biography from './Biography';
import AboutFooter from './AboutFooter';
import FadeInSection from '@/components/FadeInSection';
import SectionHeading from '@/components/SectionHeading';

const About = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 }, maxWidth: 1100, mx: 'auto' }}>
      <FadeInSection>
        <SectionHeading sectionName="About" />
      </FadeInSection>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 5, md: 8 },
        }}
      >
        <FadeInSection delay={0.1} sx={{ flexShrink: 0 }}>
          <Box
            sx={{
              p: '3px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #38c0f2, #a78bfa)',
            }}
          >
            <Box sx={{ borderRadius: '18px', overflow: 'hidden', bgcolor: '#09090b' }}>
              <HeadShotImage width={260} height={260} />
            </Box>
          </Box>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Box sx={{ maxWidth: 600 }}>
            <AboutHeader />
            <Biography />
            <AboutFooter />
          </Box>
        </FadeInSection>
      </Box>
    </Box>
  );
};

export default About;
