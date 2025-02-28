import ProjectCards from './ProjectCards';
import projectData from '../../data/projects.json';
import { Box } from '@mui/material';

const ProjectsContainer = () => {
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
      <ProjectCards projects={projectData} />
    </Box>
  );
};

export default ProjectsContainer;
