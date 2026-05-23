'use client';

import { Box, Typography, Chip } from '@mui/material';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ProjectCard({ project, featured = false }) {
  const allTools = project.technologies?.flatMap((t) => t.tools) || [];

  return (
    <Box
      component="a"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: '#18181b',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        gridColumn: featured ? { md: 'span 2' } : undefined,
        '&:hover': {
          borderColor: 'rgba(56, 189, 248, 0.3)',
          transform: 'translateY(-4px)',
        },
        '&:hover .project-arrow': {
          transform: 'translate(3px, -3px)',
          color: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: featured ? { xs: 200, md: 280 } : { xs: 160, md: 200 },
          overflow: 'hidden',
        }}
      >
        <Image
          src={`/images/${project.coverImage}`}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(9,9,11,0.9) 100%)',
          }}
        />
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: featured ? '1.25rem' : '1.05rem', fontWeight: 600, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          <OpenInNewIcon
            className="project-arrow"
            sx={{
              fontSize: 18,
              color: 'text.secondary',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              ml: 1,
              mt: 0.3,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'text.secondary',
            mb: 1.5,
          }}
        >
          {project.dateStarted} — {project.dateCompleted}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: featured ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.875rem',
          }}
        >
          {project.short_description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {allTools.slice(0, featured ? 8 : 5).map((tool) => (
            <Chip
              key={tool}
              label={tool}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                bgcolor: 'rgba(56, 189, 248, 0.08)',
                color: 'primary.main',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                borderRadius: '6px',
              }}
            />
          ))}
          {allTools.length > (featured ? 8 : 5) && (
            <Chip
              label={`+${allTools.length - (featured ? 8 : 5)}`}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                bgcolor: 'rgba(255,255,255,0.04)',
                color: 'text.secondary',
                borderRadius: '6px',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
