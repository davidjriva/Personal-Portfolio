'use client';

import { Box, Typography } from '@mui/material';
import FadeIn from './FadeIn';

const SectionHeading = ({ sectionName, subtitle }) => {
  return (
    <FadeIn>
      <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            mb: 1.5,
            display: 'block',
          }}
        >
          {sectionName}
        </Typography>
        {subtitle && (
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              color: '#fafafa',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </FadeIn>
  );
};

export default SectionHeading;
