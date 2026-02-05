'use client';

import ProjectCards from './ProjectCards';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

const ProjectsContainer = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        px: { xs: 2, md: 4, lg: 6 },
      }}
    >
      <ProjectCards projects={projectData} />
    </Box>
  );
};

export default ProjectsContainer;

