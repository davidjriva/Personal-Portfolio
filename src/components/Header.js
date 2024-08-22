import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavBar from './NavBar';

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2), // Use theme spacing for consistent padding
      }}
    >
      <NavBar />
    </Box>
  );
};

export default Header;
