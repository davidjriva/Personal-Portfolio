'use client';

import ProjectCards from './ProjectCards';
import { Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const ProjectsContainer = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current centered card index
  const containerRef = useRef(null);

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
      ref={containerRef}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        padding: 2,
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
          height: '6px',
          visibility: 'hidden',
        },
        '&:hover::-webkit-scrollbar': {
          visibility: 'visible', // Show scrollbar on hover
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        position: 'relative',

        cursor: 'grab', // Indicate that it's draggable
        '&:active': {
          cursor: 'grabbing', // Indicate it's being dragged
        },
      }}
    >
      <ProjectCards projects={projectData} currentIndex={currentIndex} onClick={scrollToCenter} />
    </Box>
  );
};

export default ProjectsContainer;
