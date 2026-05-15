'use client';

import { Box } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import AboutHeader from './AboutHeader';
import AboutFooter from './AboutFooter';
import Biography from './Biography';
import SimpleTimeline from './SimpleTimeline';
import SectionHeading from '@/components/SectionHeading';

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
      }}
    >
      <SectionHeading sectionName="About" subtitle="A bit about me" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: 'flex-start',
        }}
      >
        {/* Left column: headshot + bio */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: 120, sm: 160 },
                height: { xs: 120, sm: 160 },
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(232, 230, 227, 0.08)',
              }}
            >
              <HeadShotImage width={160} height={160} />
            </Box>

            <Box>
              <AboutHeader />
              <Biography />
            </Box>
          </Box>

          <AboutFooter />
        </Box>

        {/* Right column: timeline */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            flexShrink: 0,
            width: 340,
          }}
        >
          <SimpleTimeline />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
