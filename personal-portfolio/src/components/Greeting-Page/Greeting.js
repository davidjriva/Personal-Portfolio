'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ViewWorkButton from '@/components/Greeting-Page/ViewWorkButton';

const Greeting = () => {
  const roles = ['full-stack developer', 'data scientist', 'educator']; // List of roles to type and delete
  const baseTypingSpeed = 100; // Base speed for typing (in ms)
  const baseDeletingSpeed = 50; // Base speed for deleting (in ms)
  const delayBeforeDeleting = 1200; // Shorter delay before starting to delete (in ms)
  const delayBetweenRoles = 500; // Short delay between deleting and typing new role

  const [text, setText] = useState(''); // Text that will be typed
  const [index, setIndex] = useState(0); // Tracks the current character index
  const [deleting, setDeleting] = useState(false); // Whether we are deleting the text
  const [roleIndex, setRoleIndex] = useState(0); // Tracks the current role being typed
  const [cursorVisible, setCursorVisible] = useState(true); // Cursor visibility for blinking effect

  // Determine the appropriate article ("a" or "an") based on the role
  const getArticle = (role) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(role[0].toLowerCase()) ? 'an' : 'a';
  };

  // Function to randomize typing and deleting speed slightly for a more natural feel
  const getRandomSpeed = (baseSpeed) => {
    return baseSpeed + Math.random() * 50;
  };

  // Typing and deleting effect logic
  useEffect(() => {
    const currentRole = `${roles[roleIndex]}.`; // Current role (full-stack developer, data scientist, or educator)
    let timer;

    if (!deleting && index < currentRole.length) {
      // Typing logic
      timer = setTimeout(() => {
        setText((prev) => prev + currentRole[index]);
        setIndex((prev) => prev + 1);
      }, getRandomSpeed(baseTypingSpeed)); // Typing with slight speed randomness
    } else if (!deleting && index === currentRole.length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setDeleting(true);
      }, delayBeforeDeleting);
    } else if (deleting && index > 0) {
      // Deleting logic
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1)); // Remove one character
        setIndex((prev) => prev - 1);
      }, getRandomSpeed(baseDeletingSpeed)); // Deleting with slight speed randomness
    } else if (deleting && index === 0) {
      // Switch to the next role after deletion is done
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length); // Move to the next role in the array
      }, delayBetweenRoles); // Small pause before typing the next role
    }

    return () => clearTimeout(timer);
  }, [index, deleting, roleIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const blinkCursor = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 300); // Faster blinking cursor for a more dynamic feel
    return () => clearInterval(blinkCursor);
  }, []);

  return (
    <Box
      sx={{
        color: 'white',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Typography variant="h1">
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>
      <Typography variant="h1">
        I'm {getArticle(roles[roleIndex])} {text}
        {/* Show the blinking cursor */}
        <span style={{ color: '#38c0f2', opacity: cursorVisible ? 1 : 0 }}>|</span>{' '}
        {/* Use opacity for smooth blinking */}
      </Typography>

      <ViewWorkButton />
    </Box>
  );
};

export default Greeting;
