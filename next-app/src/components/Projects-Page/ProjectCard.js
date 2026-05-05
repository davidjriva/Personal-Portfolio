'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools).slice(0, 6);

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
          background: 'rgba(255, 255, 255, 0.02)',
          border: featured ? '1px solid rgba(232, 168, 56, 0.12)' : '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: featured ? '1px solid rgba(232, 168, 56, 0.3)' : '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(255, 255, 255, 0.03)',
            '& .project-image': { transform: 'scale(1.03)' },
            '& .launch-icon': { opacity: 1, transform: 'translate(2px, -2px)' },
          },
        }}
        onClick={onClick}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            height: featured ? 200 : 170,
            width: '100%',
            overflow: 'hidden',
            bgcolor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Image
            src={`/images/${coverImage}`}
            alt={`${title}`}
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="project-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 10, 11, 0.85) 100%)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              sx={{
                fontSize: featured ? '1rem' : '0.9rem',
                fontWeight: 600,
                color: '#f0ede8',
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
            <LaunchIcon
              className="launch-icon"
              sx={{
                fontSize: '0.9rem',
                color: 'rgba(240, 237, 232, 0.3)',
                opacity: 0.5,
                transition: 'all 0.25s ease',
                flexShrink: 0,
                ml: 1,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'rgba(240, 237, 232, 0.3)',
              mb: 1.5,
              letterSpacing: '0.03em',
            }}
          >
            {dateStarted} — {dateCompleted}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'rgba(240, 237, 232, 0.5)',
              lineHeight: 1.6,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {short_description}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  color: 'rgba(240, 237, 232, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  height: '22px',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
