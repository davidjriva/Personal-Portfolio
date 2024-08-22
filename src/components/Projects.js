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
      <Grid container spacing={2}>
        {projectData.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.title}>
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
