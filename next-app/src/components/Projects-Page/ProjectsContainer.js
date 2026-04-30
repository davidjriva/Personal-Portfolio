'use client';

import { Box, Skeleton, Grid, Collapse, Button } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FadeIn from '@/components/FadeIn';

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
    <Box sx={{ width: '100%', maxWidth: '1100px', margin: '0 auto', px: { xs: 2, md: 4 } }}>
      {loading ? (
        <Grid container spacing={2.5}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '16px', overflow: 'hidden' }}>
                <Skeleton variant="rectangular" height={200} sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Box sx={{ p: 2.5 }}>
                  <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.04)', fontSize: '1rem' }} />
                  <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
                  <Skeleton variant="text" sx={{ bgcolor: 'rgba(255,255,255,0.04)', mt: 1 }} height={50} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={2.5}>
            {featuredProjects.map((project, i) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <FadeIn delay={i * 0.08}>
                  <ProjectCard {...project} featured />
                </FadeIn>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                color: '#71717a',
                borderColor: 'rgba(255,255,255,0.08)',
                border: '1px solid',
                borderRadius: '12px',
                px: 3,
                py: 0.85,
                textTransform: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: '#a1a1aa',
                },
              }}
            >
              {showAll ? 'Show less' : `View all ${projectData.length} projects`}
            </Button>
          </Box>

          <Collapse in={showAll} timeout={400}>
            <Grid container spacing={2.5} sx={{ mt: 1 }}>
              {otherProjects.map((project, i) => (
                <Grid key={project.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <FadeIn delay={i * 0.06}>
                    <ProjectCard {...project} />
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </>
      )}
    </Box>
  );
};

export default ProjectsContainer;
