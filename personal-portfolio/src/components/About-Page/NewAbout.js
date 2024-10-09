import { Typography, Box } from '@mui/material';
import SocialLinks from './SocialLinks';
import ResumeButton from './ResumeButton';

const NewAbout = () => {
  return (
    <Box
      id="about-section"
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold', // Make the heading bold
        }}
      >
        About Me
      </Typography>

      <img
        src="/images/person-outline.svg"
        alt="Person"
        style={{
          width: '25vw',
          height: 'auto',
        }}
      />

      <Typography
        variant="h5"
        sx={{
          color: '#38c0f2', // Change color for better visibility
          mb: 1, // Add margin below the job title
        }}
      >
        Technical Trainer
      </Typography>

      <Typography
        sx={{
          color: '#757474',
          mb: 2, // Add margin below the contact info
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

      <Box sx={{ marginTop: 4, textAlign: 'left', width: '80%', maxWidth: '600px' }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#757474' }}>
          Driven and accomplished software engineer and educator with a B.S. in Computer Science from Colorado State
          University, graduating summa cum laude, and a minor in Mathematics. Experienced in full-stack development,
          data engineering, and big data visualization. Proficient in data structures, algorithms, and mathematical
          applications. Passionate about elegant problem-solving and dedicated to maintaining high standards of
          excellence.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#757474', marginTop: 2 }}>
          Thrives in a collaborative environment that values innovation and rigorous quality.
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <ResumeButton />
        <SocialLinks />
      </Box>
    </Box>
  );
};

export default NewAbout;
