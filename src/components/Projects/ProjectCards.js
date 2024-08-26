import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectCards = ({ searchedProjects }) => {
  return (
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
  );
};

export default ProjectCards;