'use client';

import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { Box } from '@mui/material';

const ProjectCards = ({ projects }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const cardRefs = useRef([]);

  // Sorts all projects chronologically by start date.
  const sortedProjectData = [...projects].sort((a, b) => {
    return new Date(b.dateStarted) - new Date(a.dateStarted);
  });

  /* 
    Find tallest card after rendering.
    We use this to make all project card components the same height.
  */
  useEffect(() => {
    if (cardRefs.current.length) {
      const tallest = Math.max(...cardRefs.current.map((ref) => ref?.offsetHeight || 0));
      setMaxHeight(tallest);
    }
  }, [sortedProjectData]);

  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
      {sortedProjectData.map((project, index) => (
        <ProjectCard key={project.title} ref={(el) => (cardRefs.current[index] = el)} {...project} height={maxHeight} />
      ))}
    </Box>
  );
};

export default ProjectCards;
