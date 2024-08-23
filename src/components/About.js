import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 250px)',
        padding: '2rem',
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          David <span style={{ color: '#0a73c9' }}>Riva</span>
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'left',
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

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: 'left', color: '#757474', }}>
          Driven and accomplished software engineer and educator with a B.S. in Computer Science from Colorado State
          University, graduating summa cum laude, and a minor in Mathematics. Experienced in full-stack development,
          data engineering, and big data visualization. Proficient in data structures, algorithms, and mathematical
          applications. Passionate about elegant problem-solving and dedicated to maintaining high standards of
          excellence.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, textAlign: 'left', color: '#757474', marginTop: 2}}>
          Thrives in a collaborative environment that values innovation and rigorous quality.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
