'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Card
        ref={ref}
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          color: '#fafafa',
          border: featured ? '1px solid rgba(56,192,242,0.12)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid rgba(56,192,242,0.25)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(56,192,242,0.06)',
            '& .project-cover-image': { transform: 'scale(1.04)' },
            '& .launch-icon': { opacity: 1, transform: 'translate(0, 0)' },
          },
        }}
      >
        <Box sx={{ position: 'relative', height: featured ? 200 : 170, width: '100%', overflow: 'hidden' }}>
          <Image
            src={`/images/${coverImage}`}
            alt={`${title} cover`}
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="project-cover-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(9,9,11,0) 40%, rgba(9,9,11,0.85) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, color: '#fafafa', mb: 0.5 }}
              >
                {title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                {dateStarted} – {dateCompleted}
              </Typography>
            </Box>
            <LaunchIcon
              className="launch-icon"
              sx={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.3)',
                opacity: 0,
                transform: 'translate(-4px, 4px)',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                mt: 0.25,
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.82rem',
              flex: 1,
            }}
          >
            {short_description}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {allTools.slice(0, 6).map((tool, i) => (
              <Chip
                key={i}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.68rem',
                  height: '22px',
                  fontWeight: 500,
                }}
              />
            ))}
            {allTools.length > 6 && (
              <Chip
                label={`+${allTools.length - 6}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(56,192,242,0.08)',
                  color: 'rgba(56,192,242,0.6)',
                  border: '1px solid rgba(56,192,242,0.15)',
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
  },
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
