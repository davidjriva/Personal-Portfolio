import { useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Box, Grid } from '@mui/material'; // Using Grid (v2 is now default in v7)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCards = ({ projects }) => {
  const containerRef = useRef(null);

  // Sorts all projects chronologically by start date.
  const sortedProjectData = [...projects].sort((a, b) => {
    return new Date(b.dateStarted) - new Date(a.dateStarted);
  });

  useEffect(() => {
    if (!containerRef.current || sortedProjectData.length === 0) return;

    const cards = containerRef.current.querySelectorAll('.project-card-item');
    
    gsap.fromTo(cards, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // Animation starts when top of container hits 80% of viewport height
        }
      }
    );

    // Refresh ScrollTrigger after render
    ScrollTrigger.refresh();

    return () => {
        // Cleanup ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, [sortedProjectData]);

  return (
    <Box ref={containerRef} sx={{ width: '100%', py: 4 }}>
      <Grid container spacing={4} sx={{width: '100%', margin: 0}}>
        {sortedProjectData.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.title} className="project-card-item">
            <ProjectCard
              {...project}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectCards;

