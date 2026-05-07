import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="Projects" title="What I've built" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
