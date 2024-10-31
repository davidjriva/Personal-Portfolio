'use client';

import { Button } from '@mui/material';
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
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.5)',
        },
      }}
    >
      View my work
      <KeyboardDoubleArrowDownIcon sx={{ marginLeft: '8px', fontSize: '20px' }} />
    </Button>
  );
};

export default ViewWorkButton;
