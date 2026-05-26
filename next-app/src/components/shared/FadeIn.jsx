'use client';

import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const transforms = {
  up: 'translateY(30px)',
  down: 'translateY(-30px)',
  left: 'translateX(30px)',
  right: 'translateX(-30px)',
  none: 'none',
};

const FadeIn = ({ children, delay = 0, direction = 'up', sx, ...props }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeIn;
