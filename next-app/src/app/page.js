import { Box } from '@mui/material';
import { Analytics } from '@vercel/analytics/next';

import Greeting from '@/components/Greeting-Page/Greeting';
import About from '@/components/About-Page/About';
import Projects from '@/components/Projects-Page/Projects';
import Contact from '@/components/Contact-Page/Contact';
import Skills from '@/components/Skills-Page/Skills';
import Awards from '@/components/Awards-Page/Awards';
import ParticleBackground from '@/components/ParticleBackground';
import NavBar from '@/components/Navbar/NavBar';
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
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        minHeight: '100vh',
      }}
    > 
      {/* Enables Vercel deployment analytics */}
      <Analytics />

      <Box sx={{ position: 'relative', height: '100vh' }}>
        <ParticleBackground />
        <Greeting />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />

        <Box 
          id="about"
          sx={{ 
            bgcolor: '#262624', 
            width: '100%',
            color: 'white',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <About />
        </Box>

        <Box 
          id="projects"
          sx={{ 
            bgcolor: '#1F1E1D', 
            width: '100%',
            color: 'white',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <Projects />
        </Box>

        <Box 
          id="contact"
          sx={{ 
            bgcolor: '#141413', 
            width: '100%',
            color: 'white'
          }}
        >
          <Contact />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
export default MainPage;
