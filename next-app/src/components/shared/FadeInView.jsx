'use client';

import { useRef } from 'react';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const FadeInView = ({ children, delay = 0, direction = 'up', sx = {}, ...props }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const transforms = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
    none: 'none',
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeInView;
