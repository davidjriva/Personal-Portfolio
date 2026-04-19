'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import { keyframes } from '@emotion/react';

const glowFrames = Array.from({ length: 51 }, (_, i) => {
  const r = 240 - 2 * i;
  const g = 240 - i;
  const b = 250;
  return `${i}% { box-shadow: 0 0 20px 5px rgba(${r}, ${g}, ${b}, 1); }`;
}).join(' ');

const reverseGlowFrames = Array.from({ length: 50 }, (_, i) => {
  const r = 140 + 2 * i;
  const g = 190 + i;
  const b = 250;
  return `${51 + i}% { box-shadow: 0 0 20px 5px rgba(${r}, ${g}, ${b}, 1); }`;
}).join(' ');

const glowAnimation = keyframes`${glowFrames}\n${reverseGlowFrames}`;

const HeadShotImage = ({ width, height }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius: '50%',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Image
        alt="Photo of David Riva"
        src="/images/headshot.webp"
        width={width}
        height={height}
        style={{
          objectFit: 'cover',
        }}
        priority={true}
      />
    </Box>
  );
};

export default HeadShotImage;
