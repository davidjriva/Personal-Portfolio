'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

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
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          color: '#fafafa',
          border: featured ? '1px solid rgba(56, 192, 242, 0.1)' : '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          cursor: 'pointer',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(56, 192, 242, 0.25)' : 'rgba(255, 255, 255, 0.12)',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            '& .project-image': { transform: 'scale(1.03)' },
            '& .arrow-icon': { opacity: 1, transform: 'translate(2px, -2px)' },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            height: featured ? '200px' : '160px',
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
              background: 'linear-gradient(to bottom, transparent 40%, rgba(6, 6, 10, 0.8) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5, pt: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: '#fafafa',
                  lineHeight: 1.3,
                  fontSize: featured ? '1rem' : '0.9rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#3f3f46', mt: 0.25 }}>
                {dateStarted} – {dateCompleted}
              </Typography>
            </Box>
            <ArrowOutwardIcon
              className="arrow-icon"
              sx={{
                fontSize: '1rem',
                color: '#52525b',
                opacity: 0,
                transition: 'all 0.2s ease',
                flexShrink: 0,
                ml: 1,
              }}
            />
          </Box>

          {/* Description */}
          <Typography
            sx={{
              color: '#71717a',
              lineHeight: 1.6,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.82rem',
            }}
          >
            {short_description}
          </Typography>

          {/* Tech tags */}
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.slice(0, 5).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  color: '#52525b',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  fontSize: '0.68rem',
                  height: '22px',
                  borderRadius: '6px',
                  fontWeight: 500,
                }}
              />
            ))}
            {allTools.length > 5 && (
              <Chip
                label={`+${allTools.length - 5}`}
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: '#3f3f46',
                  fontSize: '0.68rem',
                  height: '22px',
                  borderRadius: '6px',
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
