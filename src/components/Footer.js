import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#3c4142',
        textAlign: 'center',
        height: '3vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        color: '#ffffff',
      }}
    >
      <Typography variant="body2">&copy; 2024 David Riva. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
