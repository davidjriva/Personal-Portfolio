'use client';

import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ResumeButton = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => window.open('/documents/resume.pdf', '_blank')}
      startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
      sx={{
        color: '#d4a053',
        borderColor: 'rgba(212, 160, 83, 0.3)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.85rem',
        fontWeight: 500,
        px: 2.5,
        py: 0.75,
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: '#d4a053',
          bgcolor: 'rgba(212, 160, 83, 0.06)',
        },
      }}
    >
      Resume
    </Button>
  );
};

export default ResumeButton;
