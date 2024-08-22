import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProjectCard from './ProjectCard';
import projectData from '../data/projects.json';

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        borderRadius: '8px',
        minHeight: 'calc(100vh - 250px)',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h3"
        sx={{ marginBottom: '2rem', textAlign: 'center', textDecoration: 'underline' }}
      >
        My Projects
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {projectData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
