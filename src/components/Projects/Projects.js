import { Box, Typography } from '@mui/material';
import AsyncHelmet from '../AsyncHelmet';
import projectData from '../../data/projects.json';
import FilteringMenu from './FilteringMenu';

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
      <AsyncHelmet pageName="Projects" />

      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#333' }}>
        Projects
      </Typography>

      <FilteringMenu projectData={projectData} />
    </Box>
  );
};

export default Projects;
