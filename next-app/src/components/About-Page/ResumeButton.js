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
      startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: '10px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.85rem',
        px: 2.5,
        py: 0.8,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(129, 140, 248, 0.4)',
          color: '#818cf8',
          background: 'rgba(129, 140, 248, 0.06)',
        },
      }}
    >
      Resume
    </Button>
  );
};

export default ResumeButton;
