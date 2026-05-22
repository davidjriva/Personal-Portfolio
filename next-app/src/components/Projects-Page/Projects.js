'use client';

import { Box, Typography } from '@mui/material';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#38c0f2',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mb: 4,
        }}
      >
        Projects
      </Typography>

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
