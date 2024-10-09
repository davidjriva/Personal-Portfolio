'use client';

import { Button } from '@mui/material';

const ResumeButton = () => {
  const handleResumeClick = () => {
    window.open('/documents/resume.pdf', '_blank');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleResumeClick} sx={{ marginTop: '1rem', marginBottom: 2 }}>
      View Resume as PDF
    </Button>
  );
};

export default ResumeButton;
