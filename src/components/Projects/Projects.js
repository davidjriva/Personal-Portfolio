import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AsyncHelmet from '../AsyncHelmet';
import ProjectCards from './ProjectCards';
import projectData from '../../data/projects.json';
import FilteringMenu from './FilteringMenu';
import { useFilter } from './useFilter';

const Projects = () => {
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [searchText, setSearchText] = useState('');

  const { filterByUniqueProjects, filterBySelectedChips } = useFilter();

  // Sorts all projects chronologically by start date
  const sortedProjectData = [...projectData].sort((a, b) => {
    return new Date(b.dateStarted) - new Date(a.dateStarted);
  });

  // Extract project names
  const projectNames = projectData.map((project) => project.title);

  // Extracts the unique tools used across all projects
  const uniqueTools = filterByUniqueProjects({ sortedProjectData });

  // Filter projects based on selected chips
  const filteredProjects = filterBySelectedChips({ selectedChips, sortedProjectData });

  // Further filter projects based on search text
  const searchedProjects = filteredProjects.filter((project) =>
    project.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <AsyncHelmet pageName="Projects" />

      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#333' }}>
        Projects
      </Typography>

      <FilteringMenu
        projectNames={projectNames}
        searchText={searchText}
        setSearchText={setSearchText}
        uniqueTools={uniqueTools}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
      />

      <ProjectCards searchedProjects={searchedProjects} />
    </Box>
  );
};

export default Projects;
