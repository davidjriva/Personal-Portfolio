'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button, Stack, IconButton, Collapse } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FadeIn from '@/components/sections/FadeIn';

const ProjectCard = ({ project, featured = false }) => {
  const techTools = project.technologies.flatMap((t) => t.tools);

  return (
    <Box
      sx={{
        height: '100%',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        bgcolor: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: featured ? { xs: 'column', md: 'row' } : 'column',
        '&:hover': {
          borderColor: 'rgba(129,140,248,0.15)',
          bgcolor: 'rgba(255,255,255,0.03)',
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        },
      }}
    >
      {/* Cover image */}
      <Box
        sx={{
          position: 'relative',
          width: featured ? { xs: '100%', md: '45%' } : '100%',
          height: featured ? { xs: 220, md: 'auto' } : { xs: 180, sm: 200 },
          minHeight: featured ? { md: 280 } : undefined,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={`/images/${project.coverImage}`}
          alt={project.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            '.MuiBox-root:hover &': { transform: 'scale(1.03)' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9,9,11,0.6) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: { xs: 2.5, md: 3 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: featured ? '1.15rem' : '1rem', fontWeight: 700, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          <IconButton
            component="a"
            href={project.link}
            target="_blank"
            rel="noopener"
            size="small"
            sx={{
              color: 'text.secondary',
              flexShrink: 0,
              '&:hover': { color: 'primary.main' },
            }}
          >
            <GitHubIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mb: 0.5 }}>
          {project.dateStarted}
          {project.dateStarted !== project.dateCompleted && ` – ${project.dateCompleted}`}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.88rem',
            mb: 2,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: featured ? 4 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {featured ? project.long_description : project.short_description}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={0.8}>
          {techTools.slice(0, featured ? 8 : 5).map((tool) => (
            <Chip
              key={tool}
              label={tool}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: 'rgba(129,140,248,0.08)',
                color: 'primary.light',
                border: '1px solid rgba(129,140,248,0.12)',
              }}
            />
          ))}
          {techTools.length > (featured ? 8 : 5) && (
            <Chip
              label={`+${techTools.length - (featured ? 8 : 5)}`}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                bgcolor: 'rgba(255,255,255,0.04)',
                color: 'text.secondary',
              }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
          PROJECTS
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
          Things I&apos;ve built
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 600 }}>
          A selection of personal and professional projects spanning AI, full-stack development, and data engineering.
        </Typography>
      </FadeIn>

      {/* Featured projects */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        {featured.map((project, i) => (
          <FadeIn key={project.title} delay={i * 0.1}>
            <ProjectCard project={project} featured />
          </FadeIn>
        ))}
      </Box>

      {/* Other projects */}
      <Collapse in={showAll} timeout={500}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
            mb: 4,
          }}
        >
          {others.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </Box>
      </Collapse>

      {others.length > 0 && (
        <FadeIn>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outlined"
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: showAll ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                  }}
                />
              }
              sx={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'text.secondary',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.2)',
                  bgcolor: 'rgba(255,255,255,0.03)',
                },
              }}
            >
              {showAll ? 'Show Featured Only' : `View All Projects (${projects.length})`}
            </Button>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
};

export default Projects;
