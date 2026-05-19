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
        80 + Math.random() * 40
      );
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && index > 0) {
      timer = setTimeout(
        () => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        },
        35 + Math.random() * 25
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
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.5)',
        lineHeight: 1.4,
      }}
    >
      I&apos;m {getArticle(ROLES[roleIndex])}{' '}
      <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{text}</span>
      <span style={{ color: '#818cf8', opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </Typography>
  );
};

export default AnimatedTypingTypography;
