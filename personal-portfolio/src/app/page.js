/*
    The single page that will structure and hold all child pages for the portfolio
*/
import { Box } from '@mui/material';
import Greeting from '@/components/Greeting-Page/Greeting';
import NewAbout from '@/components/About-Page/NewAbout';
import Experience from '@/components/Experience-Page/Experience';
import Education from '@/components/Education-Page/Education';
import Projects from '@/components/Projects-Page/Projects';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ParticleBackground from '@/components/ParticleBackground';

const MainPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282829',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      >
        <ParticleBackground />
        <Greeting />
      </Box>

      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      >
        <NewAbout />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Awards />
      </Box>
    </Box>
  );
};

export default MainPage;
