'use client';

import ProjectCards from './ProjectCards';
import projectData from '../../data/projects.json';
import { Box } from '@mui/material';

const ProjectsContainer = () => {
  const scrollToCenter = (index) => {
    const cardElement = document.getElementById(`project-card-${index}`);
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        padding: 2,
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': { height: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
      }}
    >
      <ProjectCards projects={projectData} onClick={scrollToCenter} />
    </Box>
  );
};

export default ProjectsContainer;
