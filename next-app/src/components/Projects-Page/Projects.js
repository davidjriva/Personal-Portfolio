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
        maxWidth: 1100,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <SectionHeading sectionName="Projects" subtitle="A selection of things I've built" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
