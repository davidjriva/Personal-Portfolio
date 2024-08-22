import React from 'react';
import { Box, Typography } from '@mui/material';

const Contact = () => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      <Typography variant="h2">Contact Me</Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
        Email: <a href="mailto:davidjriva@gmail.com">davidjriva@gmail.com</a>
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
        LinkedIn:{' '}
        <a
          href="https://www.linkedin.com/in/david-j-riva"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Riva
        </a>
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
        GitHub:{' '}
        <a href="https://github.com/davidjriva" target="_blank" rel="noopener noreferrer">
          github.com/davidjriva
        </a>
      </Typography>
    </Box>
  );
};

export default Contact;
