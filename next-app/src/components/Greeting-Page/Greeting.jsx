'use client';

import { Box, Typography, Stack } from '@mui/material';
import AnimatedTypingTypography from '@/components/Greeting-Page/AnimatedTypingTypography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AssistantIcon from '@mui/icons-material/Assistant';
import Link from 'next/link';

const Greeting = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about');
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - 70, behavior: 'smooth' });
  };

  return (
    <Box
        sx={{
          color: '#ffffff',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          <span style={{ color: '#ffffff' }}>Hello, I'm </span>
          <span style={{ color: '#38c0f2' }}>David</span>
        </Typography>

        <AnimatedTypingTypography />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} sx={{ mt: { xs: 3, sm: 4 } }}>
          <Box
            component="button"
            onClick={scrollToSection}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.25,
              borderRadius: '50px',
              background: 'rgba(56, 192, 242, 0.12)',
              border: '1px solid rgba(56, 192, 242, 0.45)',
              color: '#38c0f2',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                background: 'rgba(56, 192, 242, 0.2)',
                borderColor: '#38c0f2',
              },
            }}
          >
            <KeyboardDoubleArrowDownIcon fontSize="small" />
            View my work
          </Box>

          <Box
            component={Link}
            href="/chat"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.25,
              borderRadius: '50px',
              background: 'rgba(110, 64, 201, 0.15)',
              border: '1px solid rgba(110, 64, 201, 0.4)',
              color: '#a680ff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
              '&:hover': {
                background: 'rgba(110, 64, 201, 0.25)',
                borderColor: '#6e40c9',
              },
            }}
          >
            <AssistantIcon fontSize="small" />
            Chat with my agent
          </Box>
        </Stack>
      </Box>
  );
};

export default Greeting;
