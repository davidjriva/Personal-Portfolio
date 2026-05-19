'use client';

import { Box, Skeleton, Grid, Collapse, Button } from '@mui/material';
import { useState, useEffect, useRef, useMemo, memo } from 'react';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = memo(function FeaturedProjects({ projects }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;
    const cards = containerRef.current.querySelectorAll('.featured-card-item');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [projects]);

  return (
    <Box ref={containerRef}>
      <Grid container spacing={2.5} sx={{ width: '100%', margin: 0 }}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.title} className="featured-card-item">
            <ProjectCard {...project} featured />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
FeaturedProjects.displayName = 'FeaturedProjects';

const AllProjects = ({ projects }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;
    const cards = containerRef.current.querySelectorAll('.all-card-item');
    gsap.fromTo(cards, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
  }, [projects]);

  return (
    <Box ref={containerRef}>
      <Grid container spacing={2.5} sx={{ width: '100%', margin: 0 }}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.title} className="all-card-item">
            <ProjectCard {...project} />
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

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Grid container spacing={2.5}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  p: 2.5,
                  bgcolor: 'rgba(255,255,255,0.025)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Skeleton variant="text" sx={{ mt: 2, fontSize: '1.2rem', bgcolor: 'rgba(255,255,255,0.04)' }} />
                <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <FeaturedProjects projects={featuredProjects} />

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                color: 'rgba(255,255,255,0.45)',
                borderColor: 'rgba(255,255,255,0.1)',
                border: '1px solid',
                borderRadius: '10px',
                px: 3,
                py: 0.85,
                textTransform: 'none',
                fontSize: '0.82rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fafafa',
                },
              }}
            >
              {showAll ? 'Show less' : `View all ${projectData.length} projects`}
            </Button>
          </Box>

          <Collapse in={showAll} timeout={400}>
            <Box sx={{ mt: 3 }}>
              <AllProjects projects={otherProjects} />
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default ProjectsContainer;
