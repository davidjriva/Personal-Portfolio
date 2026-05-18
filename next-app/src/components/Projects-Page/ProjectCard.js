'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, id }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Card
        ref={ref}
        id={id}
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          color: '#fafafa',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(129, 140, 248, 0.2)',
            background: 'rgba(129, 140, 248, 0.03)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3)',
            '& .project-image': { transform: 'scale(1.04)' },
            '& .launch-icon': { opacity: 1, transform: 'translate(0, 0)' },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: featured ? 200 : 160,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={`/images/${coverImage}`}
            alt={`${title} cover`}
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="project-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, rgba(9, 9, 11, 0.8) 100%)',
            }}
          />
          <Box
            className="launch-icon"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 30,
              height: 30,
              borderRadius: '8px',
              bgcolor: 'rgba(9, 9, 11, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transform: 'translate(4px, -4px)',
              transition: 'all 0.3s ease',
            }}
          >
            <LaunchIcon sx={{ fontSize: '0.85rem', color: '#818cf8' }} />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5 } }}>
          <Typography
            component="h3"
            sx={{
              fontWeight: 700,
              fontSize: featured ? '1rem' : '0.9rem',
              color: '#fafafa',
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: 'rgba(255, 255, 255, 0.25)', display: 'block', mb: 1.5, fontSize: '0.72rem' }}
          >
            {dateStarted} – {dateCompleted}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.45)',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.8rem',
            }}
          >
            {short_description}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.slice(0, 5).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(129, 140, 248, 0.06)',
                  color: 'rgba(129, 140, 248, 0.8)',
                  border: '1px solid rgba(129, 140, 248, 0.1)',
                  fontSize: '0.68rem',
                  height: '22px',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
            {allTools.length > 5 && (
              <Chip
                label={`+${allTools.length - 5}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: '0.68rem',
                  height: '22px',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            )}
          </Stack>
        </Box>
      </Card>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
