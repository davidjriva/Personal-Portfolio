'use client';

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
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 3, sm: 4, md: 6 },
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
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -3,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.3), rgba(192, 132, 252, 0.15))',
              zIndex: 0,
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '17px',
              overflow: 'hidden',
              bgcolor: '#09090b',
              width: { xs: 200, sm: 240 },
              height: { xs: 200, sm: 240 },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <HeadShotImage width={240} height={240} />
          </Box>
        </Box>

        <Box sx={{ flex: 1, maxWidth: '640px' }}>
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
