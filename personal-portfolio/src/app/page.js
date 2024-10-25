import { Box } from '@mui/material';
import Greeting from '@/components/Greeting-Page/Greeting';
import About from '@/components/About-Page/About';
import Education from '@/components/Education-Page/Education';
import Projects from '@/components/Projects-Page/Projects';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ExperienceTimeLine from '@/components/Experience-Page/ExperienceTimeLine';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/NavBar';

const MainPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#282829',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative', height: '100vh' }}>
        <ParticleBackground />
        <Greeting />
      </Box>

      <NavBar />

      <Box>
        <section id="about">
          <About />
        </section>

        <section id="experience">
          <ExperienceTimeLine />
        </section>

        <section id="education">
          <Education />
        </section>

        {/*
        <Education />
        <Projects />
        <Skills />
        <Awards /> */}
      </Box>
    </Box>
  );
};
export default MainPage;
