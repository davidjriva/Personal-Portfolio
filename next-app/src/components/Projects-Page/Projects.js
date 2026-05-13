import { Box, Typography } from '@mui/material';
import ProjectsContainer from './ProjectsContainer';

const Projects = () => {
  return (
    <Box
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.3)', mb: 4, display: 'block' }}>
        Projects
      </Typography>

      <ProjectsContainer />
    </Box>
  );
};

export default Projects;
