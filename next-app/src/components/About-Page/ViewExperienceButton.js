'use client';

import { Button } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useRouter } from 'next/navigation';

const ViewExperienceButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push('/experience')}
      sx={{
        marginTop: '20px',
        backgroundColor: 'rgba(10, 115, 201, 0)',
        border: '2px solid #38c0f2',
        borderRadius: '30px',
        padding: '10px 20px',
        color: '#38c0f2',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'rgba(10, 115, 201, 0.5)',
        },
        gap: 1
      }}
    >
      See Full Timeline
      <PageviewIcon />
    </Button>
  );
};

export default ViewExperienceButton;
