'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, id }, ref) => {
    const allTools = technologies.flatMap((t) => t.tools);

    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#131316',
          color: '#f4f4f5',
          border: featured ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: featured ? 200 : 170,
            width: '100%',
            bgcolor: '#0e0e0e',
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
              background: 'linear-gradient(to bottom, transparent 30%, rgba(19, 19, 22, 0.9) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography
            component="h3"
            sx={{ fontWeight: 700, mb: 0.5, color: '#f4f4f5', lineHeight: 1.3, fontSize: featured ? '1.05rem' : '0.95rem' }}
          >
            {title}
          </Typography>

          <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', mb: 1.5 }}>
            {dateStarted} – {dateCompleted}
          </Typography>

          <Typography
            sx={{
              color: '#9ca3af',
              lineHeight: 1.65,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.82rem',
            }}
          >
            {short_description}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            {allTools.slice(0, 6).map((tool) => (
              <Chip
                key={tool}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                  color: '#818cf8',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  fontSize: '0.68rem',
                  height: '24px',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
            {allTools.length > 6 && (
              <Chip
                label={`+${allTools.length - 6}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  color: '#6b7280',
                  fontSize: '0.68rem',
                  height: '24px',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            )}
          </Stack>

          <Button
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
            fullWidth
            sx={{
              mt: 'auto',
              color: '#f4f4f5',
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              py: 0.85,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.07)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
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
