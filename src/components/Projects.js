import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Projects = () => {
  const theme = useTheme();

  return (
    <Box
      id="projects"
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: '8px',
        margin: theme.spacing(2),
        boxShadow: theme.shadows[1],
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: theme.palette.text.primary, marginBottom: theme.spacing(2) }}
      >
        My Projects
      </Typography>
      <Box className="project" sx={{ marginBottom: theme.spacing(3) }}>
        <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
          Nature Nomads
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
          An e-commerce platform for booking nature tours. Built with Node.js, Express, MongoDB, and
          more.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: theme.spacing(2) }}
          component="a"
          href="https://github.com/davidjriva/nodejs_projects/tree/main/nature-nomads"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </Button>
      </Box>
      {/* Add more projects as needed */}
    </Box>
  );
};

export default Projects;
