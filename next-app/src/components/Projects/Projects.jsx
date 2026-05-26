'use client';

import { Box, Typography, Button, Chip, Stack, Grid, Collapse, Skeleton } from '@mui/material';
import Image from 'next/image';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect, useMemo } from 'react';
import FadeIn from '@/components/shared/FadeIn';

const ProjectCard = ({ project, featured }) => {
  const allTools = project.technologies.flatMap((t) => t.tools);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(17, 17, 22, 0.6)',
        border: '1px solid',
        borderColor: featured ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.06)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: featured ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255,255,255,0.12)',
          transform: 'translateY(-4px)',
          boxShadow: featured ? '0 16px 48px rgba(99, 102, 241, 0.1)' : '0 12px 40px rgba(0,0,0,0.3)',
          '& .project-cover': { transform: 'scale(1.03)' },
        },
      }}
    >
      {/* Cover image */}
      <Box sx={{ position: 'relative', height: featured ? 200 : 160, overflow: 'hidden' }}>
        <Image
          src={`/images/${project.coverImage}`}
          alt={project.title}
          fill
          className="project-cover"
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, rgba(6,6,10,0.9) 100%)',
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontWeight: 600,
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            mb: 0.5,
          }}
        >
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5 }}>
          {project.dateStarted} — {project.dateCompleted}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.short_description}
        </Typography>

        {/* Tech chips */}
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ mb: 2.5 }}>
          {allTools.slice(0, 6).map((tool) => (
            <Chip
              key={tool}
              label={tool}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                fontWeight: 500,
                bgcolor: 'rgba(99, 102, 241, 0.08)',
                color: 'primary.light',
                border: '1px solid rgba(99, 102, 241, 0.15)',
              }}
            />
          ))}
          {allTools.length > 6 && (
            <Chip
              label={`+${allTools.length - 6}`}
              size="small"
              sx={{ height: 24, fontSize: '0.7rem', bgcolor: 'rgba(255,255,255,0.04)', color: 'text.secondary' }}
            />
          )}
        </Stack>

        {/* Link */}
        <Button
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<LaunchIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            mt: 'auto',
            color: 'text.secondary',
            fontSize: '0.8rem',
            justifyContent: 'flex-start',
            p: 0,
            minWidth: 0,
            '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
          }}
        >
          View Project
        </Button>
      </Box>
    </Box>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted));
        setProjects(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);
  const others = useMemo(() => projects.filter((p) => !p.featured), [projects]);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, textAlign: 'center' }}>
          Projects
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 8, maxWidth: 500, mx: 'auto' }}>
          A selection of things I&apos;ve built
        </Typography>
      </FadeIn>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rounded"
                height={360}
                sx={{ borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.04)' }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            {featured.map((p, i) => (
              <Grid key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <FadeIn delay={i * 0.1}>
                  <ProjectCard project={p} featured />
                </FadeIn>
              </Grid>
            ))}
          </Grid>

          {others.length > 0 && (
            <>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  onClick={() => setShowAll((v) => !v)}
                  endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  sx={{
                    color: 'text.secondary',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  {showAll ? 'Show less' : `View all ${projects.length} projects`}
                </Button>
              </Box>

              <Collapse in={showAll} timeout={400}>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                  {others.map((p, i) => (
                    <Grid key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
                      <FadeIn delay={i * 0.08}>
                        <ProjectCard project={p} />
                      </FadeIn>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Projects;
