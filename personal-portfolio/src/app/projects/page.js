import { Box, Typography } from '@mui/material';
import ProjectsContainer from '../../components/Projects/ProjectsContainer';

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#333' }}>
        Projects
      </Typography>

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
