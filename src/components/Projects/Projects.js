import React, { useState } from 'react';
import { Box, Typography, Divider, Autocomplete, TextField } from '@mui/material';
import AsyncHelmet from '../AsyncHelmet';
import ProjectCard from './ProjectCard';
import FilteringBox from './FilteringBox';
import projectData from '../../data/projects.json';
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

      <Divider sx={{ margin: '2rem' }} />

      <Autocomplete
        options={projectNames}
        onInputChange={(_, value) => setSearchText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter A Project Name..."
            sx={{
              borderRadius: '200px', // Adjust this value for more rounded edges
              '& .MuiOutlinedInput-root': {
                borderRadius: '200px', // Ensure the input field is also rounded
              },
            }}
          />
        )}
      />

      <Divider sx={{ margin: '2rem' }} />

      <Typography variant="h6" sx={{ color: '#333' }}>
        Filter by technology
      </Typography>

      <FilteringBox uniqueTools={uniqueTools} selectedChips={selectedChips} setSelectedChips={setSelectedChips} />

      <Divider sx={{ margin: '2rem' }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {searchedProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
