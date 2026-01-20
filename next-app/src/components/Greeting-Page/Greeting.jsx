'use client';

import { Box, Typography, Stack } from '@mui/material';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import StyledButton from '@/components/Buttons/StyledButton';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AssistantIcon from '@mui/icons-material/Assistant';
import { redirect } from 'next/navigation';

const Greeting = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about');
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;

    const offset = 70;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const redirectToChat = () => redirect('/chat');

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
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Hello, I'm <span style={{ color: '#38c0f2' }}>David</span>.
      </Typography>

      <AnimatedTypingTypography />

      <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
        <StyledButton onClick={scrollToSection} text="View my work" icon={<KeyboardDoubleArrowDownIcon />}/>
        <StyledButton onClick={redirectToChat} text="Chat with my agent" icon={<AssistantIcon />}/>
      </Stack>
    </Box>
  );
};

export default Greeting;
