import React from 'react';
import { Box } from '@mui/material';
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
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(30vw, 1fr))', 
        gap: '2rem',
      }}
    >
      {projectData.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </Box>
  );
};

export default Projects;
