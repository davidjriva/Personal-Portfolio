'use client';

import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ResumeButton = () => {
  const handleResumeClick = () => {
    window.open('/documents/resume.pdf', '_blank');
  };

  return (
    <Button
      variant="outlined"
      onClick={handleResumeClick}
      startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem' }} />}
      sx={{
        color: '#A1A1AA',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        px: 2.5,
        py: 1,
        fontSize: '0.85rem',
        fontWeight: 500,
        textTransform: 'none',
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: 'rgba(129, 140, 248, 0.4)',
          color: '#818CF8',
          backgroundColor: 'rgba(129, 140, 248, 0.05)',
        },
      }}
    >
      View Resume
    </Button>
  );
};

export default ResumeButton;
