'use client';

import { Toolbar, AppBar, IconButton, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SectionHeading from './SectionHeading';

const ChildPageNavBar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');

    setTimeout(() => {
      const element = document.getElementById('about');

      // Scroll to slightly above the section
      if (element) {
        const offset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <AppBar
      sx={{
        top: 0,
        height: '9vh',
        backgroundColor: '#333',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <IconButton sx={{ color: 'white' }} onClick={handleClick}>
          <KeyboardDoubleArrowLeftIcon sx={{ width: '35px', height: '35px' }} />
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
