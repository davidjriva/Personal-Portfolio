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
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <SectionHeading sectionName="Projects" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
