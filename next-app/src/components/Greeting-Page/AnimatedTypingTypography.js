'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const ROLES = ['applied AI engineer', 'full-stack developer', 'forward deployed engineer'];

const AnimatedTypingTypography = () => {
  const baseTypingSpeed = 90;
  const baseDeletingSpeed = 45;
  const delayBeforeDeleting = 1400;
  const delayBetweenRoles = 400;

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const getRandomSpeed = (baseSpeed) => baseSpeed + Math.random() * 40;

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!deleting && index < currentRole.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + currentRole[index]);
        setIndex((prev) => prev + 1);
      }, getRandomSpeed(baseTypingSpeed));
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), delayBeforeDeleting);
    } else if (deleting && index > 0) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, getRandomSpeed(baseDeletingSpeed));
    } else if (deleting && index === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, delayBetweenRoles);
    }

    return () => clearTimeout(timer);
  }, [index, deleting, roleIndex]);

  return (
    <Typography
      sx={{
        fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' },
        fontWeight: 300,
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.01em',
        textAlign: 'center',
        minHeight: '2em',
      }}
    >
      {text}
      <Box
        component="span"
        sx={{
          color: '#a78bfa',
          fontWeight: 300,
          animation: 'blink 1s step-end infinite',
        }}
      >
        |
      </Box>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </Typography>
  );
};

export default AnimatedTypingTypography;
