'use client';

import { Box, Typography } from '@mui/material';
import FadeInView from './FadeInView';

const SectionWrapper = ({ children, label, title, subtitle, maxWidth = '1200px', sx = {} }) => {
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 10, md: 14 },
        px: { xs: 2.5, sm: 4, md: 6 },
        ...sx,
      }}
    >
      <Box sx={{ maxWidth, mx: 'auto' }}>
        <FadeInView>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            {label && (
              <Typography
                variant="overline"
                sx={{
                  color: '#a78bfa',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  mb: 1.5,
                  display: 'block',
                }}
              >
                {label}
              </Typography>
            )}
            {title && (
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  color: '#fafafa',
                  mb: subtitle ? 1.5 : 0,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '600px',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </FadeInView>
        {children}
      </Box>
    </Box>
  );
};

export default SectionWrapper;
