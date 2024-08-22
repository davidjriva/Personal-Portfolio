import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        borderRadius: '8px',
        minHeight: 'calc(100vh - 250px)',
        padding: '2rem', 
        backgroundColor: '#f5f5f5', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Typography
        variant="h3"
        sx={{ marginBottom: '2rem', textAlign: 'center', textDecoration: 'underline' }}
      >
        My Projects
      </Typography>

      <Box
        className="project"
        sx={{
          backgroundColor: '#ffffff', 
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem', 
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: '0.5rem' }}>
          Nature Nomads
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, marginBottom: '1rem' }}>
          An e-commerce platform for booking nature tours. Built with Node.js, Express, MongoDB, and
          more.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component="a"
          href="https://github.com/davidjriva/nodejs_projects/tree/main/nature-nomads"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </Button>
      </Box>
    </Box>
  );
};

export default Projects;
