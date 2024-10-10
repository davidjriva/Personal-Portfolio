'use client';

import { Button } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const ViewWorkButton = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={scrollToSection}
      sx={{
        marginTop: '20px',
        backgroundColor: 'transparent', // Clear background
        border: '2px solid #38c0f2', // Optional border color
        borderRadius: '30px', // Oval shape
        padding: '10px 20px', // Padding for size
        color: '#38c0f2', // Text color
        display: 'flex', // Flex to align icon and text
        alignItems: 'center', // Center the icon vertically
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.1)', // Light hover effect
        },
      }}
    >
      View my work
      <KeyboardDoubleArrowDownIcon sx={{ marginLeft: '8px', fontSize: '20px' }} />
    </Button>
  );
};

export default ViewWorkButton;
