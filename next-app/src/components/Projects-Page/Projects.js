import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <SectionHeading sectionName="Projects" subtitle="Selected work and side projects." />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
