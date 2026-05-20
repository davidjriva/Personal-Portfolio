import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box>
      <SectionHeading sectionName="Projects" subtitle="Things I've built" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
