import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="Projects" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
