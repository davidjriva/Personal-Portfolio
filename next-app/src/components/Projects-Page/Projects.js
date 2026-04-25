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
        maxWidth: '1100px',
        mx: 'auto',
        pt: { xs: '60px', md: '80px' },
        pb: { xs: '60px', md: '80px' },
        px: { xs: 3, md: 6 },
      }}
    >
      <SectionHeading sectionName="Projects" />
      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
