import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Contact = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: '8px',
        margin: theme.spacing(2),
        boxShadow: theme.shadows[1],
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: theme.palette.text.primary, marginBottom: theme.spacing(2) }}
      >
        Contact Me
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
        Email:{' '}
        <a href="mailto:davidjriva@gmail.com" style={{ color: theme.palette.primary.main }}>
          davidjriva@gmail.com
        </a>
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
        LinkedIn:{' '}
        <a
          href="https://www.linkedin.com/in/david-j-riva"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.palette.primary.main }}
        >
          David Riva
        </a>
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
        GitHub:{' '}
        <a
          href="https://github.com/davidjriva"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.palette.primary.main }}
        >
          github.com/davidjriva
        </a>
      </Typography>
    </Box>
  );
};

export default Contact;
