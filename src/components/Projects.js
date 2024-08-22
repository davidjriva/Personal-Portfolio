import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
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
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'stretch', // Ensures all cards have the same height
        }}
      >
        {projectData.map((project) => (
          <Box key={project.title} sx={{ flex: '1 1 calc(33.333% - 16px)' }}>
            <ProjectCard {...project} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
