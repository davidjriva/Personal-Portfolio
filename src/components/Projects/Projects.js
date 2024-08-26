import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import ProjectCard from './ProjectCard';
import FilteringBox from './FilteringBox';
import projectData from '../../data/projects.json';

const Projects = () => {
  // Sorts all projects chronologically by start date
  const sortedProjectData = [...projectData].sort((a, b) => {
    return new Date(b.dateStarted) - new Date(a.dateStarted);
  });

  // Extracts the unique tools used across all projects
  const allTools = sortedProjectData.flatMap((project) => project.technologies.flatMap((tech) => tech.tools));
  const uniqueTools = [...new Set(allTools)];

  return (
    <Box
      id="projects"
      sx={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Helmet>
        <title> David Riva | Projects </title>
      </Helmet>

      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#333' }}>
        Projects
      </Typography>

      <FilteringBox uniqueTools={uniqueTools} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {sortedProjectData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
