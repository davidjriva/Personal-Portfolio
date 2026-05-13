'use client';

import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const ROLES = ['applied AI engineer', 'full-stack developer', 'forward deployed engineer'];

const AnimatedTypingTypography = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!deleting && index < currentRole.length) {
      timer = setTimeout(
        () => {
          setText((prev) => prev + currentRole[index]);
          setIndex((prev) => prev + 1);
        },
        80 + Math.random() * 40,
      );
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && index > 0) {
      timer = setTimeout(
        () => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        },
        35 + Math.random() * 25,
      );
    } else if (deleting && index === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [index, deleting, roleIndex]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((prev) => !prev), 400);
    return () => clearInterval(blink);
  }, []);

  return (
    <Typography
      sx={{
        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '0.01em',
        minHeight: '1.6em',
      }}
    >
      {text}
      <span style={{ color: '#6eb6f0', opacity: cursorVisible ? 0.7 : 0, transition: 'opacity 0.1s' }}>|</span>
    </Typography>
  );
};

export default AnimatedTypingTypography;
