import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

export const metadata = {
  title: 'David Riva | Projects',
};

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 10, md: 15 },
      }}
    >
      <SectionHeading sectionName="Projects" subtitle="What I've built" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
