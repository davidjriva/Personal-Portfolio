'use client';

import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ResumeButton = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => window.open('/documents/resume.pdf', '_blank')}
      startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem' }} />}
      sx={{
        color: '#fafafa',
        borderColor: 'rgba(255,255,255,0.15)',
        borderRadius: '10px',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.85rem',
        px: 2.5,
        py: 1,
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: '#38c0f2',
          bgcolor: 'rgba(56,192,242,0.08)',
          color: '#38c0f2',
        },
      }}
    >
      Resume
    </Button>
  );
};

export default ResumeButton;
