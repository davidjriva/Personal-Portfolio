'use client';

import { Box, Skeleton, Grid, Collapse, Button } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ProjectsContainer = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted));
        setProjectData(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featuredProjects = useMemo(() => projectData.filter((p) => p.featured), [projectData]);
  const otherProjects = useMemo(() => projectData.filter((p) => !p.featured), [projectData]);

  return (
    <Box>
      {loading ? (
        <Grid container spacing={2.5}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.04)' }}
                />
                <Skeleton variant="text" sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Grid container spacing={2.5}>
            {featuredProjects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.title}>
                <ProjectCard {...project} featured />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                px: 2.5,
                py: 0.75,
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                bgcolor: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: '#e8e6e3',
                },
              }}
            >
              {showAll ? 'Show less' : `View all ${projectData.length} projects`}
            </Button>
          </Box>

          <Collapse in={showAll} timeout={400}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2.5}>
                {otherProjects.map((project) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.title}>
                    <ProjectCard {...project} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default ProjectsContainer;
