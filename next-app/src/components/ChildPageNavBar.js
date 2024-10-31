'use client';

import { Toolbar, AppBar, IconButton, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SectionHeading from './SectionHeading';

const ChildPageNavBar = () => {
  const router = useRouter();

  return (
    <AppBar
      sx={{
        top: 0,
        height: '9vh',
        backgroundColor: '#333',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <IconButton sx={{ color: 'white' }} onClick={() => router.push('/')}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SectionHeading sectionName="Experience" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChildPageNavBar;
