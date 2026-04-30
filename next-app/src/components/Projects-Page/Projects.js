import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <SectionHeading sectionName="Projects" subtitle="What I've built" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
