'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const ROLES = ['forward deployed engineer', 'applied AI engineer', 'full-stack developer'];

const AnimatedTypingTypography = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const getArticle = (role) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(role[0].toLowerCase()) ? 'an' : 'a';
  };

  useEffect(() => {
    const currentRole = `${ROLES[roleIndex]}.`;
    let timer;

    if (!deleting && index < currentRole.length) {
      timer = setTimeout(
        () => {
          setText((prev) => prev + currentRole[index]);
          setIndex((prev) => prev + 1);
        },
        90 + Math.random() * 40,
      );
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && index > 0) {
      timer = setTimeout(
        () => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        },
        40 + Math.random() * 30,
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
    const blinkCursor = setInterval(() => setCursorVisible((prev) => !prev), 400);
    return () => clearInterval(blinkCursor);
  }, []);

  return (
    <Typography
      sx={{
        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
        fontWeight: 300,
        color: '#6b6b80',
        textAlign: 'center',
        minHeight: '2em',
      }}
    >
      I&apos;m {getArticle(ROLES[roleIndex])}{' '}
      <Box component="span" sx={{ color: '#a0a0b0', fontWeight: 400 }}>
        {text}
      </Box>
      <Box component="span" sx={{ color: '#60a5fa', opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>
        |
      </Box>
    </Typography>
  );
};

export default AnimatedTypingTypography;
