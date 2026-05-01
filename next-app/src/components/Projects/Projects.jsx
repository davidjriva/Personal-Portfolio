'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Button, Collapse, Skeleton, Grid } from '@mui/material';
import Image from 'next/image';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SectionWrapper from '@/components/shared/SectionWrapper';
import FadeInView from '@/components/shared/FadeInView';

const FeaturedProject = ({ project, index, isReversed }) => {
  return (
    <FadeInView delay={index * 0.1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: isReversed ? 'row-reverse' : 'row' },
          gap: { xs: 0, md: 4 },
          mb: { xs: 4, md: 6 },
          bgcolor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'rgba(167, 139, 250, 0.2)',
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
            '& .project-img': { transform: 'scale(1.03)' },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '50%' },
            minHeight: { xs: 200, md: 280 },
            overflow: 'hidden',
          }}
        >
          <Image
            src={`/images/${project.coverImage}`}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
            className="project-img"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: { xs: 'linear-gradient(to bottom, transparent 50%, rgba(9,9,11,0.8) 100%)', md: 'none' },
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.1em', mb: 1 }}
          >
            {project.dateStarted} – {project.dateCompleted}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, mb: 1.5, color: '#fafafa' }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.45)', mb: 2.5, lineHeight: 1.7, fontSize: '0.85rem' }}
          >
            {project.short_description}
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5} sx={{ mb: 2.5 }}>
            {project.technologies.flatMap((t) => t.tools).map((tool) => (
              <Chip
                key={tool}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(167,139,250,0.08)',
                  color: '#a78bfa',
                  border: '1px solid rgba(167,139,250,0.15)',
                  fontSize: '0.68rem',
                  height: '22px',
                }}
              />
            ))}
          </Stack>
          <Box>
            <Button
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                color: 'rgba(255,255,255,0.6)',
                borderColor: 'rgba(255,255,255,0.12)',
                border: '1px solid',
                borderRadius: '999px',
                px: 2.5,
                py: 0.6,
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.3)',
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: '#fafafa',
                },
              }}
            >
              View Project
            </Button>
          </Box>
        </Box>
      </Box>
    </FadeInView>
  );
};

const SmallProjectCard = ({ project, index }) => {
  return (
    <FadeInView delay={index * 0.06}>
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.12)',
            transform: 'translateY(-3px)',
            '& .sm-project-img': { transform: 'scale(1.03)' },
          },
        }}
      >
        <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }}>
          <Image
            src={`/images/${project.coverImage}`}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="sm-project-img"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.9) 100%)',
            }}
          />
        </Box>
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', mb: 0.5 }}>
            {project.dateStarted} – {project.dateCompleted}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#fafafa', mb: 1, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.short_description}
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5} sx={{ mb: 2, mt: 'auto' }}>
            {project.technologies
              .flatMap((t) => t.tools)
              .slice(0, 4)
              .map((tool) => (
                <Chip
                  key={tool}
                  label={tool}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.45)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '0.65rem',
                    height: '20px',
                  }}
                />
              ))}
          </Stack>
          <Button
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: '0.8rem !important' }} />}
            fullWidth
            sx={{
              color: 'rgba(255,255,255,0.5)',
              borderColor: 'rgba(255,255,255,0.08)',
              border: '1px solid',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.75rem',
              py: 0.6,
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.2)',
                bgcolor: 'rgba(255,255,255,0.04)',
                color: '#fafafa',
              },
            }}
          >
            View
          </Button>
        </Box>
      </Box>
    </FadeInView>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => r.json())
      .then((data) => {
        setProjects([...data].sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      label="Projects"
      title="Things I've built"
      subtitle="From production RAG pipelines to agentic AI systems and full-stack applications."
      maxWidth="1100px"
      sx={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {loading ? (
        <Stack spacing={3}>
          {[1, 2].map((i) => (
            <Skeleton key={i} variant="rectangular" height={280} sx={{ borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.04)' }} />
          ))}
        </Stack>
      ) : (
        <>
          {featured.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} isReversed={i % 2 === 1} />
          ))}

          <FadeInView delay={0.1}>
            <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
              <Button
                onClick={() => setShowAll((prev) => !prev)}
                endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{
                  color: 'rgba(255,255,255,0.45)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid',
                  borderRadius: '999px',
                  px: 3,
                  py: 0.75,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 500,
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
          </FadeInView>

          <Collapse in={showAll} timeout={400}>
            <Grid container spacing={2}>
              {others.map((project, i) => (
                <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <SmallProjectCard project={project} index={i} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </>
      )}
    </SectionWrapper>
  );
};

export default Projects;
