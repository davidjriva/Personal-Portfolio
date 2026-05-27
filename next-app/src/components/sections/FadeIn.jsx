'use client';

import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const FadeIn = ({ children, delay = 0, direction = 'up', ...props }) => {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

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
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeIn;
