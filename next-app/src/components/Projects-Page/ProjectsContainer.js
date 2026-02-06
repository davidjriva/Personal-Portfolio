'use client';

import ProjectCards from './ProjectCards';
import { Box, Skeleton, Grid } from '@mui/material';
import { useState, useEffect } from 'react';

const ProjectsContainer = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjectData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        px: { xs: 2, md: 4, lg: 6 },
      }}
    >
      {loading ? (
        <Grid container spacing={4}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item key={item} xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: 2 }}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" sx={{ mt: 2, fontSize: '1.5rem' }} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" sx={{ mt: 1 }} height={60} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <ProjectCards projects={projectData} />
      )}
    </Box>
  );
};

export default ProjectsContainer;

