import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 0, md: 0 } }}>
      <SectionHeading sectionName="Projects" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
