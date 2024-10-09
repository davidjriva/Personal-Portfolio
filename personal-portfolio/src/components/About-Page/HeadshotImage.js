'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import { keyframes } from '@emotion/react';

const glowFrames = Array.from({ length: 51 }, (_, i) => {
  const r = 240 - 2 * i; // Red decreases from 240 to 0
  const g = 240 - i; // Green decreases from 240 to 140
  const b = 250; // Blue remains constant at 250
  return `${i}% { box-shadow: 0 0 20px 5px rgba(${r}, ${g}, ${b}, 1); }`; // Adjusted for smoother transition
}).join(' ');

console.log(glowFrames);

// Create the reverse glow frames
const reverseGlowFrames = Array.from({ length: 50 }, (_, i) => {
  const r = 140 + 2 * i; // Red increases from 0 to 240
  const g = 190 + i; // Green increases from 140 to 240
  const b = 250; // Blue remains constant at 250
  return `${51 + i}% { box-shadow: 0 0 20px 5px rgba(${r}, ${g}, ${b}, 1); }`; // Adjusted for smoother transition
}).join(' ');

console.log(reverseGlowFrames);

// Combine the glow and reverse glow frames for the full animation
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
        animation: `${glowAnimation} 5s infinite`,
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

      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0', // No width for the triangle
            height: '0', // No height for the triangle
            borderLeft: '10px solid transparent', // Left side of triangle
            borderRight: '10px solid transparent', // Right side of triangle
            borderBottom: '20px solid rgba(0, 0, 139, 0.6)', // Bottom side of triangle (blue)
            transform: `rotate(${index * 60}deg) translateY(-50%) translateX(-50%)`,
            zIndex: -1,
            filter: 'blur(2px)', // Optional for a softer look
          }}
        />
      ))}
    </Box>
  );
};

export default HeadShotImage;
