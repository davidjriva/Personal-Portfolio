'use client';

import { Button } from '@mui/material';

const ResumeButton = () => {
  const handleResumeClick = () => {
    window.open('/documents/resume.pdf', '_blank');
  };

  return (
    <Button 
      variant="contained" 
      onClick={handleResumeClick} 
      sx={{ 
        marginTop: '1rem', 
        marginBottom: 2,
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      View Resume as PDF
    </Button>
  );
};

export default ResumeButton;
