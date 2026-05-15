import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
      }}
    >
      <SectionHeading sectionName="Projects" subtitle="Selected work" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
