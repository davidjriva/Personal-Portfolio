import { Box } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';
import FadeInSection from '@/components/FadeInSection';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 6 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <FadeInSection>
        <SectionHeading sectionName="Projects" />
      </FadeInSection>

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
