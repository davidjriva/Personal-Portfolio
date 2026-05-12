'use client';

import { Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ResumeButton = () => {
  const handleResumeClick = () => {
    window.open('/documents/resume.pdf', '_blank');
  };

  return (
    <Button
      variant="outlined"
      onClick={handleResumeClick}
      endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
      sx={{
        color: '#a1a1aa',
        borderColor: 'rgba(255,255,255,0.12)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        px: 2.5,
        py: 0.75,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.25)',
          bgcolor: 'rgba(255,255,255,0.04)',
          color: '#fafafa',
        },
      }}
    >
      View Resume
    </Button>
  );
};

export default ResumeButton;
