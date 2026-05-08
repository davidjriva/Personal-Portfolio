'use client';

import { Box } from '@mui/material';

const ClickableLink = ({ link, text }) => {
  return (
    <Box
      component="a"
      href={link}
      target="_blank"
      rel="noopener"
      sx={{
        color: '#818CF8',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        '&:hover': {
          color: '#A5B4FC',
          textDecoration: 'underline',
        },
      }}
    >
      {text}
    </Box>
  );
};

export default ClickableLink;
