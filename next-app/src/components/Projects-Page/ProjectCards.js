import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectCards = ({ filteredProjects }) => {
  // Sorts all projects chronologically by start date
  const sortedProjectData = [...filteredProjects].sort((a, b) => {
    return new Date(b.dateStarted) - new Date(a.dateStarted);
  });

  return (
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
  );
};

export default ProjectCards;
