'use client';

import { Box, Grid, Collapse, Button } from '@mui/material';
import { useState, useEffect, useMemo, useRef } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AnimatedCards = ({ projects, className }) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box ref={containerRef}>
      <Grid container spacing={2.5} sx={{ width: '100%', margin: 0 }}>
        {projects.map((project, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={project.title}
            className={className}
            sx={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
            }}
          >
            <ProjectCard {...project} featured={project.featured} />
          </Grid>
        ))}
      </Grid>
    </Box>
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

  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Grid container spacing={2.5}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: '#131316',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '20px',
                  height: 380,
                  '@keyframes shimmer': {
                    '0%': { opacity: 0.5 },
                    '50%': { opacity: 0.8 },
                    '100%': { opacity: 0.5 },
                  },
                  animation: 'shimmer 2s ease-in-out infinite',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
      <AnimatedCards projects={featuredProjects} className="featured-card" />

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button
          onClick={() => setShowAll((prev) => !prev)}
          endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          sx={{
            color: '#9ca3af',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            px: 3.5,
            py: 1,
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.25s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: '#f4f4f5',
            },
          }}
        >
          {showAll ? 'Show less' : `View all ${projectData.length} projects`}
        </Button>
      </Box>

      <Collapse in={showAll} timeout={400}>
        <Box sx={{ mt: 4 }}>
          <AnimatedCards projects={otherProjects} className="all-card" />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProjectsContainer;
