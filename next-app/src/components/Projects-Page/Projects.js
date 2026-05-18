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
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      <SectionHeading sectionName="Projects" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
