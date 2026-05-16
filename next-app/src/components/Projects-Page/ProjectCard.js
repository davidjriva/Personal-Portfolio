'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const ProjectCard = forwardRef(
  (
    { coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id },
    ref
  ) => {
    const allTools = technologies ? technologies.flatMap((t) => t.tools) : [];

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
          color: '#f0ede6',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            '& .project-image': { transform: 'scale(1.03)' },
            '& .arrow-icon': {
              opacity: 1,
              transform: 'translate(0, 0)',
            },
          },
        }}
        onClick={onClick}
      >
        {/* Arrow icon on hover */}
        <Box
          className="arrow-icon"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 3,
            opacity: 0,
            transform: 'translate(-4px, 4px)',
            transition: 'all 0.3s ease',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowOutwardIcon sx={{ fontSize: '1rem', color: '#f0ede6' }} />
        </Box>

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            height: featured ? '240px' : '200px',
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
              background: 'linear-gradient(to bottom, transparent 50%, rgba(10, 10, 11, 0.8) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.5, md: 3 } }}>
          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: '#f0ede6',
              lineHeight: 1.3,
              fontSize: featured ? '1.1rem' : '1rem',
            }}
          >
            {title}
          </Typography>

          {/* Date */}
          <Typography
            variant="caption"
            sx={{ color: 'rgba(240, 237, 230, 0.35)', display: 'block', mb: 1.5, fontSize: '0.75rem' }}
          >
            {dateStarted} – {dateCompleted}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(240, 237, 230, 0.55)',
              lineHeight: 1.6,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.85rem',
            }}
          >
            {short_description}
          </Typography>

          {/* Tech chips */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {allTools.slice(0, 5).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(240, 237, 230, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.65rem',
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
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  color: 'rgba(240, 237, 230, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '0.65rem',
                  height: '22px',
                  '& .MuiChip-label': { px: 1 },
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
