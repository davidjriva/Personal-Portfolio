'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectImage = ({ coverImage, title, featured }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: featured ? '200px' : '170px',
        width: '100%',
        bgcolor: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 10, 18, 0.8) 100%)',
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
          bgcolor: featured ? 'rgba(0,212,255,0.02)' : 'rgba(255,255,255,0.025)',
          color: '#e8e8ed',
          border: featured ? '1px solid rgba(0,212,255,0.1)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: featured ? '1px solid rgba(0,212,255,0.25)' : '1px solid rgba(255,255,255,0.12)',
            bgcolor: featured ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.04)',
            '& .project-image': { transform: 'scale(1.05)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h3"
              sx={{ fontWeight: 700, mb: 0.5, color: '#e8e8ed', lineHeight: 1.3, fontSize: '0.95rem' }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', mb: 1.5 }}>
              {dateStarted} – {dateCompleted}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.65,
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
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.68rem',
                  height: '22px',
                  borderRadius: '6px',
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
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.68rem',
                  height: '22px',
                  borderRadius: '6px',
                }}
              />
            )}
          </Stack>

          <Button
            variant="text"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              mt: 'auto',
              color: '#00d4ff',
              textTransform: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              px: 0,
              justifyContent: 'flex-start',
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
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
