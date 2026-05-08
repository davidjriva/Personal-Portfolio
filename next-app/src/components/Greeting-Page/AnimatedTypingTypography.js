'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const ROLES = ['forward deployed engineer', 'applied AI engineer', 'full-stack developer'];

const AnimatedTypingTypography = () => {
  const baseTypingSpeed = 100;
  const baseDeletingSpeed = 50;
  const delayBeforeDeleting = 1200;
  const delayBetweenRoles = 500;

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const getArticle = (role) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(role[0].toLowerCase()) ? 'an' : 'a';
  };

  const getRandomSpeed = (baseSpeed) => {
    return baseSpeed + Math.random() * 50;
  };

  useEffect(() => {
    const currentRole = `${ROLES[roleIndex]}.`;
    let timer;

    if (!deleting && index < currentRole.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + currentRole[index]);
        setIndex((prev) => prev + 1);
      }, getRandomSpeed(baseTypingSpeed));
    } else if (!deleting && index === currentRole.length) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, delayBeforeDeleting);
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
    const blinkCursor = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 400);
    return () => clearInterval(blinkCursor);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
      <Typography
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
          fontWeight: 300,
          color: '#71717A',
          letterSpacing: '-0.01em',
        }}
      >
        I&apos;m {getArticle(ROLES[roleIndex])}{' '}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
          fontWeight: 500,
          background: 'linear-gradient(135deg, #818CF8 0%, #C084FC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          ml: 0.75,
        }}
      >
        {text}
      </Typography>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: '2px',
          height: { xs: '1.2rem', sm: '1.4rem', md: '1.55rem' },
          bgcolor: '#818CF8',
          ml: '2px',
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.1s ease',
          alignSelf: 'center',
        }}
      />
    </Box>
  );
};

export default AnimatedTypingTypography;
