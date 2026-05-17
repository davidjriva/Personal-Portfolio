'use client';

import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

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
        100 + Math.random() * 50,
      );
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && index > 0) {
      timer = setTimeout(
        () => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        },
        50 + Math.random() * 50,
      );
    } else if (deleting && index === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 500);
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
        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
        fontWeight: 500,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        letterSpacing: '-0.01em',
      }}
    >
      I&apos;m {getArticle(ROLES[roleIndex])} {text}
      <span
        style={{
          color: '#38c0f2',
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        |
      </span>
    </Typography>
  );
};

export default AnimatedTypingTypography;
