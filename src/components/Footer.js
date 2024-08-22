import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">&copy; 2024 David Riva. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
