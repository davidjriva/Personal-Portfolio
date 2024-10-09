"use client";

import { Button } from '@mui/material';

const ViewWorkButton = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={scrollToSection} sx={{ marginTop: '20px' }}>
      View my work
    </Button>
  );
};

export default ViewWorkButton;
