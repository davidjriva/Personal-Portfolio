'use client';

import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const FadeIn = ({ children, delay = 0, direction = 'up', sx, ...props }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const translateMap = {
    up: 'translateY(24px)',
    down: 'translateY(-24px)',
    left: 'translateX(24px)',
    right: 'translateX(-24px)',
    none: 'none',
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : translateMap[direction],
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeIn;
