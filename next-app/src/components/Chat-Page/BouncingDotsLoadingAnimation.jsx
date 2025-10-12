import React from 'react';
import { Box } from '@mui/material';

const BouncingDotsLoadingAnimation = ({
  dotSize = 4,
  dotColor = '#a3a1a1',
  spacing = 4,
  animationDuration = 0.6,
  jumpHeight = 4,
}) => {
  const dotStyle = (delay) => ({
    width: dotSize,
    height: dotSize,
    margin: `2px ${spacing}px`,
    borderRadius: '50%',
    backgroundColor: dotColor,
    opacity: 1,
    animation: `bouncing-loader ${animationDuration}s infinite alternate`,
    animationDelay: `${delay}s`,
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={dotStyle(0)} />
      <Box sx={dotStyle(0.2)} />
      <Box sx={dotStyle(0.4)} />

      <style>
        {`
          @keyframes bouncing-loader {
            to {
              opacity: 0.1;
              transform: translateY(-${jumpHeight}px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BouncingDotsLoadingAnimation;
