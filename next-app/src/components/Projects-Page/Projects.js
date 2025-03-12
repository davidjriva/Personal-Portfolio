import { Box, Typography } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import ProjectsContainer from './ProjectsContainer';

export const metadata = {
  title: 'David Riva | Projects',
};

const Projects = () => {
  return (
    <Box
      sx={{
        pt: '80px',
        pb: '80px',
        pl: { xs: 0, sm: 0, md: '80px' },
        pr: { xs: 0, sm: 0, md: '80px' },
        margin: '0 auto',
        textAlign: 'center',
        borderTop: '8px solid rgba(0,0,0,0.1)',
        backgroundColor: '#565859',
      }}
    >
      <SectionHeading sectionName="Projects" />

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
