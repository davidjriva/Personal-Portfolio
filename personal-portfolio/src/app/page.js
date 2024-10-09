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

const MainPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282829',
      }}
    >
      <Greeting />
      <NewAbout />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Awards />
    </Box>
  );
};

export default MainPage;
