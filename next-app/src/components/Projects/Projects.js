'use client';

import { Box, Typography, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, [projects]);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 2, sm: 4, md: 6, lg: 12 },
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'primary.main',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        Projects
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
        Things I&apos;ve built
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} featured />
        ))}
        {rest.slice(0, 3).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Box>

      {rest.length > 3 && (
        <>
          {showAll && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 2.5,
                mt: 2.5,
              }}
            >
              {rest.slice(3).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button
              onClick={() => setShowAll(!showAll)}
              endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'text.secondary',
                borderColor: 'rgba(255,255,255,0.12)',
                border: '1px solid',
                borderRadius: '12px',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  bgcolor: 'rgba(56, 189, 248, 0.05)',
                },
              }}
            >
              {showAll ? 'Show Less' : `Show All (${rest.length - 3} more)`}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
