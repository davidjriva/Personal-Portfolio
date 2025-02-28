import { Box } from '@mui/material';
import Greeting from '@/components/Greeting-Page/Greeting';
import About from '@/components/About-Page/About';
import Projects from '@/components/Projects-Page/Projects';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbars/NavBar';
import Footer from '@/components/Footer/Footer';
import PlayingCardContainer from '@/components/Playing-Cards-Page/PlayingCardContainer';

export const metadata = {
  title: 'DR | Personal Portfolio',
  description: "David Riva's Personal Portfolio",
};

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

      <Box>
        <NavBar />

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="playing-cards">
          <PlayingCardContainer />
        </section>

        {/* 
          <section id="skills">
            <Skills />
          </section>
          
          <section id="awards">
            <Awards />
          </section>
          */}

        {/* <Footer /> */}
      </Box>

      <Footer />
    </Box>
  );
};
export default MainPage;
