import { Box, Typography } from '@mui/material';
import SocialLinks from './SocialLinks';
import ResumeButton from './ResumeButton';

export const metadata = {
  title: 'David Riva | About',
};

const About = () => {
  return (
    <Box
      id="about-section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        padding: '2rem',
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
          }}
        >
          David <span style={{ color: '#0a73c9' }}>Riva</span>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'left',
            marginTop: -1,
            marginBottom: 1,
          }}
        >
          Technical Trainer
        </Typography>

        <Typography
          sx={{
            color: '#757474',
          }}
        >
          Bay Area, CA. |{' '}
          <a
            href="mailto:davidjriva@gmail.com"
            style={{
              color: '#0a73c9',
              textDecoration: 'none',
            }}
          >
            davidjriva@gmail.com
          </a>
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: 'left', color: '#757474' }}>
          Driven and accomplished software engineer and educator with a B.S. in Computer Science from Colorado State
          University, graduating summa cum laude, and a minor in Mathematics. Experienced in full-stack development,
          data engineering, and big data visualization. Proficient in data structures, algorithms, and mathematical
          applications. Passionate about elegant problem-solving and dedicated to maintaining high standards of
          excellence.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: 'left', color: '#757474', marginTop: 2 }}>
          Thrives in a collaborative environment that values innovation and rigorous quality.
        </Typography>
      </Box>

      <ResumeButton />

      <SocialLinks />
    </Box>
  );
};

export default About;
