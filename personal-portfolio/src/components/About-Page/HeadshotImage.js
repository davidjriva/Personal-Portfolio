"use client";

import { Box } from '@mui/material';
import Image from 'next/image';
import { keyframes } from '@emotion/react';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 20px 5px rgba(211, 211, 211, 0.8); }
  50% { box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.8); }
  100% { box-shadow: 0 0 20px 5px rgba(211, 211, 211, 0.8); }
`;

const beamAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
`;

const HeadShotImage = ({ width, height }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius: '50%',
        animation: `${glowAnimation} 3s infinite`,
        marginRight: 10,
      }}
    >
      <Image
        alt="Photo of David Riva"
        src="/images/headshot.jpeg"
        width={width}
        height={height}
        style={{
          objectFit: 'cover',
        }}
        priority={true}
      />

      {/* Random beams of light */}
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            transform: `rotate(${index * 60}deg) translateY(-50%)`,
            animation: `${beamAnimation} 2s infinite`,
            opacity: 0.5,
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.6), transparent)',
            filter: 'blur(5px)',
            zIndex: -1,
          }}
        />
      ))}
    </Box>
  );
};

export default HeadShotImage;
