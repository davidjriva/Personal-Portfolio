'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, id }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Box
        ref={ref}
        id={id}
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: featured ? 'rgba(96, 165, 250, 0.02)' : 'rgba(255, 255, 255, 0.02)',
          border: featured ? '1px solid rgba(96, 165, 250, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            bgcolor: featured ? 'rgba(96, 165, 250, 0.04)' : 'rgba(255, 255, 255, 0.035)',
            borderColor: featured ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: featured
              ? '0 16px 40px rgba(96, 165, 250, 0.08)'
              : '0 12px 32px rgba(0, 0, 0, 0.2)',
            '& .project-cover': { transform: 'scale(1.03)' },
            '& .launch-icon': { opacity: 1, transform: 'translate(0, 0)' },
          },
        }}
      >
        {/* Cover image */}
        <Box
          sx={{
            position: 'relative',
            height: featured ? 200 : 170,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={`/images/${coverImage}`}
            alt={`${title} cover`}
            className="project-cover"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(6, 6, 10, 0.8) 100%)',
            }}
          />
          <Box
            className="launch-icon"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 28,
              height: 28,
              borderRadius: '8px',
              bgcolor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transform: 'translate(4px, -4px)',
              transition: 'all 0.3s ease',
            }}
          >
            <LaunchIcon sx={{ fontSize: '0.85rem', color: '#e8e8ed' }} />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#e8e8ed', lineHeight: 1.3, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#6b6b80', mb: 1.5 }}>
            {dateStarted} — {dateCompleted}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.82rem',
              color: '#8888a0',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {short_description}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {allTools.slice(0, 5).map((tool, i) => (
              <Chip
                key={i}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(96, 165, 250, 0.06)',
                  color: '#6b6b80',
                  border: '1px solid rgba(96, 165, 250, 0.08)',
                  fontSize: '0.65rem',
                  height: '22px',
                  fontWeight: 500,
                }}
              />
            ))}
            {allTools.length > 5 && (
              <Chip
                label={`+${allTools.length - 5}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  color: '#6b6b80',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.65rem',
                  height: '22px',
                  fontWeight: 500,
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
