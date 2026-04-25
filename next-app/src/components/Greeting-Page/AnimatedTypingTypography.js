'use client';

import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const ROLES = ['forward deployed engineer', 'applied AI engineer', 'full-stack developer'];

const AnimatedTypingTypography = () => {
  const baseTypingSpeed = 90;
  const baseDeletingSpeed = 45;
  const delayBeforeDeleting = 1400;
  const delayBetweenRoles = 400;

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const getArticle = (role) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(role[0].toLowerCase()) ? 'an' : 'a';
  };

  const getRandomSpeed = (baseSpeed) => baseSpeed + Math.random() * 50;

  useEffect(() => {
    const currentRole = `${ROLES[roleIndex]}.`;
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

  useEffect(() => {
    const blinkCursor = setInterval(() => setCursorVisible((prev) => !prev), 400);
    return () => clearInterval(blinkCursor);
  }, []);

  return (
    <Typography
      sx={{
        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
        fontWeight: 400,
        color: '#71717a',
        textAlign: 'center',
        minHeight: '2em',
      }}
    >
      I&apos;m {getArticle(ROLES[roleIndex])}{' '}
      <span style={{ color: '#a1a1aa' }}>{text}</span>
      <span
        style={{
          color: '#38bdf8',
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.1s',
          fontWeight: 300,
        }}
      >
        |
      </span>
    </Typography>
  );
};

export default AnimatedTypingTypography;
