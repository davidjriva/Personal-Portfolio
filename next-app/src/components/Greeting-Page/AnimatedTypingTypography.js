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
        80 + Math.random() * 40
      );
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && index > 0) {
      timer = setTimeout(
        () => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        },
        35 + Math.random() * 20
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
    const blink = setInterval(() => setCursorVisible((prev) => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <Typography
      sx={{
        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
        fontWeight: 400,
        color: '#a1a1aa',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      {text}
      <span style={{ color: '#38bdf8', opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </Typography>
  );
};

export default AnimatedTypingTypography;
