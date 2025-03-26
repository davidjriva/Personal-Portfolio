import { Box } from '@mui/material';

import Greeting from '@/components/Greeting-Page/Greeting';
import About from '@/components/About-Page/About';
import Projects from '@/components/Projects-Page/Projects';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbars/NavBar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'DR | Personal Portfolio',
  description: "David Riva's Personal Portfolio",
  openGraph: {
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and big data visualization.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva Portfolio',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: "David Riva's headshot",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and data visualization.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
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

        {/* <section id="playing-cards">
          <PlayingCardContainer />
        </section> */}

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
