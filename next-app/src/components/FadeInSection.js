'use client';

import { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';

const FadeInSection = ({ children, delay = 0, direction = 'up', sx = {}, ...props }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms = {
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
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeInSection;
