'use client';

import { Box, Typography } from '@mui/material';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        px: { xs: 3, md: 6 },
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '80px', md: '120px' },
      }}
    >
      {/* Section heading */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: '#f0ede6',
          mb: 1,
          letterSpacing: '-0.02em',
        }}
      >
        Selected Work
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(240, 237, 230, 0.5)',
          mb: 6,
          fontSize: '1rem',
        }}
      >
        Featured projects and experiments
      </Typography>

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
