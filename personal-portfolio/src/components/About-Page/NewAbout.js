import { Typography, Box } from '@mui/material';
import SocialLinks from './SocialLinks';
import ResumeButton from './ResumeButton';

const NewAbout = () => {
  return (
    <Box
      id="about-section"
      sx={{
        marginTop: 10,
        display: 'flex', // Change to flex to align items
        alignItems: 'center', // Align items vertically
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        padding: 2,
        textAlign: 'left', // Left-align text for better structure
        bgcolor: '#282829', // Add a background color for contrast
      }}
    >
      <img
        src="/images/person-outline.svg"
        alt="Person"
        style={{
          width: '25vw',
          height: 'auto',
          marginRight: '20px', // Add space between image and text
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 1, // Optional: space below the title
          }}
        >
          David Riva
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#38c0f2',
            marginBottom: 1,
          }}
        >
          Technical Trainer
        </Typography>

        <Typography
          sx={{
            color: '#757474',
            marginBottom: 2,
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

        <Box sx={{ marginTop: 2, maxWidth: '600px' }}>
          <Typography variant="body1">
            Driven and accomplished software engineer and educator with a B.S. in Computer Science from Colorado State
            University, graduating summa cum laude, and a minor in Mathematics.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Experienced in full-stack development, data engineering, and big data visualization.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Proficient in data structures, algorithms, and mathematical applications. Passionate about elegant
            problem-solving and dedicated to maintaining high standards of excellence.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Thrives in a collaborative environment that values innovation and rigorous quality.
          </Typography>
        </Box>

        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
          <ResumeButton />
          <SocialLinks />
        </Box>
      </Box>
    </Box>
  );
};

export default NewAbout;
