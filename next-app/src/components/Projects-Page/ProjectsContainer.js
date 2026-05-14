'use client';

import { Box, Grid, Skeleton, Button } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FadeInSection from '@/components/FadeInSection';

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects([...data].sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);
  const others = useMemo(() => projects.filter((p) => !p.featured), [projects]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden' }}>
              <Skeleton variant="rectangular" height={180} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
              <Box sx={{ p: 2.5 }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1, bgcolor: 'rgba(255,255,255,0.06)' }} />
                <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Skeleton variant="text" sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.04)' }} height={50} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {featured.map((project, i) => (
          <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <FadeInSection delay={0.1 + i * 0.1}>
              <ProjectCard {...project} featured />
            </FadeInSection>
          </Grid>
        ))}
      </Grid>

      {others.length > 0 && (
        <>
          <Box sx={{ mt: 5, mb: 4, textAlign: 'center' }}>
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                color: 'rgba(255,255,255,0.4)',
                borderColor: 'rgba(255,255,255,0.1)',
                border: '1px solid',
                borderRadius: '10px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fafafa',
                },
              }}
            >
              {showAll ? 'Show less' : `View all ${projects.length} projects`}
            </Button>
          </Box>

          {showAll && (
            <Grid container spacing={3}>
              {others.map((project, i) => (
                <Grid key={project.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <FadeInSection delay={0.05 + i * 0.05}>
                    <ProjectCard {...project} />
                  </FadeInSection>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default ProjectsContainer;
