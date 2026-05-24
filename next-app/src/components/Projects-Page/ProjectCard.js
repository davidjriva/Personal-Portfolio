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
          bgcolor: 'rgba(255,255,255,0.02)',
          color: '#fafafa',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: featured ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.03)',
            '& .project-image': { transform: 'scale(1.03)' },
          },
        }}
      >
        <Box sx={{ position: 'relative', height: featured ? 200 : 160, width: '100%', overflow: 'hidden' }}>
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
          {featured && (
            <Chip
              label="Featured"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                height: 22,
                fontSize: '0.65rem',
                fontWeight: 600,
                bgcolor: 'rgba(59,130,246,0.15)',
                color: '#3b82f6',
                border: '1px solid rgba(59,130,246,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#fafafa', lineHeight: 1.3, flex: 1 }}>
              {title}
            </Typography>
            <IconButton
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: '#52525b',
                ml: 1,
                flexShrink: 0,
                width: 28,
                height: 28,
                transition: 'color 0.2s ease',
                '&:hover': { color: '#3b82f6' },
              }}
            >
              <LaunchIcon sx={{ fontSize: '0.85rem' }} />
            </IconButton>
          </Box>

          <Typography sx={{ fontSize: '0.68rem', color: '#52525b', mb: 1.5 }}>
            {dateStarted} — {dateCompleted}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.8rem',
              color: '#71717a',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {short_description}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.slice(0, 6).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: '#71717a',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.65rem',
                  height: 22,
                  fontWeight: 500,
                }}
              />
            ))}
            {allTools.length > 6 && (
              <Chip
                label={`+${allTools.length - 6}`}
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: '#52525b',
                  fontSize: '0.65rem',
                  height: 22,
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
