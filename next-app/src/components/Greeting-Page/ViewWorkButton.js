'use client';

import { Button, Typography } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const ViewWorkButton = () => {
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

  return (
    <Button
      onClick={scrollToSection}
      sx={{
        marginTop: '20px',
        backgroundColor: 'rgba(10, 115, 201, 0.25)',
        border: '2px solid #38c0f2',
        borderRadius: '30px',
        padding: '10px 20px',
        color: '#38c0f2',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.5)',
        },
      }}
    >
      <Typography
        sx={{
          color: '#38c0f2',
          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
        }}
      >
        View my work
      </Typography>
      <KeyboardDoubleArrowDownIcon sx={{ marginLeft: '8px', fontSize: '20px' }} />
    </Button>
  );
};

export default ViewWorkButton;
