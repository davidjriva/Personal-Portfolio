'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const ProjectImage = ({ coverImage, title, featured }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: featured ? '200px' : '170px',
        width: '100%',
        bgcolor: 'rgba(232, 230, 227, 0.02)',
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(12, 12, 14, 0.85) 100%)',
        }}
      />
    </Box>
  );
};

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(232, 230, 227, 0.02)',
          color: '#e8e6e3',
          border: featured
            ? '1px solid rgba(212, 160, 83, 0.12)'
            : '1px solid rgba(232, 230, 227, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: featured
              ? '1px solid rgba(212, 160, 83, 0.25)'
              : '1px solid rgba(232, 230, 227, 0.12)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 0.5,
                color: '#e8e6e3',
                lineHeight: 1.3,
                fontSize: featured ? '0.95rem' : '0.88rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(232, 230, 227, 0.25)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                mb: 1.5,
              }}
            >
              {dateStarted} – {dateCompleted}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(232, 230, 227, 0.45)',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '0.82rem',
              }}
            >
              {short_description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
            {allTools.slice(0, 6).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(232, 230, 227, 0.04)',
                  color: 'rgba(232, 230, 227, 0.5)',
                  border: '1px solid rgba(232, 230, 227, 0.06)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  height: '22px',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
            {allTools.length > 6 && (
              <Chip
                label={`+${allTools.length - 6}`}
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: 'rgba(232, 230, 227, 0.3)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  height: '22px',
                  '& .MuiChip-label': { px: 0.5 },
                }}
              />
            )}
          </Stack>

          <Button
            variant="text"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowOutwardIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              mt: 'auto',
              color: '#d4a053',
              textTransform: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              px: 0,
              justifyContent: 'flex-start',
              '&:hover': {
                bgcolor: 'transparent',
                opacity: 0.8,
              },
            }}
          >
            View Project
          </Button>
        </CardContent>
      </Card>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
