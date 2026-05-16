'use client';

import { Box, Skeleton, Grid, Collapse, Button } from '@mui/material';
import { useState, useEffect, useMemo, memo } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const FeaturedProjects = memo(function FeaturedProjects({ projects }) {
  return (
    <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
      {projects.map((project) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.title}>
          <ProjectCard {...project} featured />
        </Grid>
      ))}
    </Grid>
  );
});
FeaturedProjects.displayName = 'FeaturedProjects';

const AllProjects = ({ projects }) => {
  return (
    <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
      {projects.map((project) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.title}>
          <ProjectCard {...project} />
        </Grid>
      ))}
    </Grid>
  );
};

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
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', overflow: 'hidden' }}>
                <Skeleton variant="rectangular" height={220} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Box sx={{ p: 3 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1.2rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} />
                  <Skeleton variant="text" sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.03)' }} height={60} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <FeaturedProjects projects={featuredProjects} />

          {otherProjects.length > 0 && (
            <>
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button
                  onClick={() => setShowAll((prev) => !prev)}
                  endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  sx={{
                    color: 'rgba(240, 237, 230, 0.55)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid',
                    borderRadius: '50px',
                    px: 3.5,
                    py: 1,
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#f0ede6',
                    },
                  }}
                >
                  {showAll ? 'Show less' : `View all ${projectData.length} projects`}
                </Button>
              </Box>

              <Collapse in={showAll} timeout={400}>
                <Box sx={{ mt: 4 }}>
                  <AllProjects projects={otherProjects} />
                </Box>
              </Collapse>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProjectsContainer;
