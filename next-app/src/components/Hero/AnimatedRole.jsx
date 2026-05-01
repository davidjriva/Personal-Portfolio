'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const ROLES = ['AI engineer', 'full-stack developer', 'builder'];

const AnimatedRole = () => {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIdx];
    let timer;

    if (!deleting && charIdx < currentRole.length) {
      timer = setTimeout(() => {
        setText(currentRole.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 80 + Math.random() * 40);
    } else if (!deleting && charIdx === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setText(currentRole.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 40 + Math.random() * 20);
    } else if (deleting && charIdx === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 'clamp(1.5rem, 5vw, 2.5rem)', md: '2.5rem' },
        color: 'rgba(255,255,255,0.35)',
        fontWeight: 500,
        minHeight: '1.3em',
      }}
    >
      {text}
      <Box
        component="span"
        sx={{
          color: '#a78bfa',
          ml: '2px',
          '@keyframes blink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 },
          },
          animation: 'blink 1s step-end infinite',
        }}
      >
        |
      </Box>
    </Typography>
  );
};

export default AnimatedRole;
