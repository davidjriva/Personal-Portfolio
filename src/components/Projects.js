import React from 'react';
import { Box, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';
import projectData from '../data/projects.json';

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        padding: '2rem',
        borderRadius: '12px',
        margin: '2rem auto',
        maxWidth: '1200px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, color: '#333', textAlign: 'center' }}>
        Projects
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {projectData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
