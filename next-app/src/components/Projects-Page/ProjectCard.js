'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Card
        ref={ref}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.12)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            '& .project-image': { transform: 'scale(1.03)' },
            '& .project-link': { opacity: 1 },
          },
        }}
      >
        {/* Image */}
        <Box sx={{ position: 'relative', height: featured ? 200 : 170, width: '100%', overflow: 'hidden' }}>
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
              background: 'linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.9) 100%)',
            }}
          />
          <IconButton
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              opacity: 0,
              backgroundColor: 'rgba(9,9,11,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fafafa',
              transition: 'opacity 0.2s ease',
              width: 32,
              height: 32,
              '&:hover': { backgroundColor: 'rgba(9,9,11,0.8)' },
            }}
          >
            <LaunchIcon sx={{ fontSize: '0.85rem' }} />
          </IconButton>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5, pt: 2 }}>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              component="h3"
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#fafafa',
                lineHeight: 1.3,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#52525b', mb: 1.5 }}>
              {dateStarted} — {dateCompleted}
            </Typography>
            <Typography
              sx={{
                color: '#a1a1aa',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {short_description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.slice(0, 5).map((tool) => (
              <Chip
                key={tool}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: '#71717a',
                  border: '1px solid rgba(255,255,255,0.06)',
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
                  bgcolor: 'transparent',
                  color: '#52525b',
                  fontSize: '0.68rem',
                  height: '22px',
                  fontWeight: 500,
                }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
