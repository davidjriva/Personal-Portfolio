'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = forwardRef(
  ({ coverImage, title, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id }, ref) => {
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
          bgcolor: featured ? 'rgba(167,139,250,0.03)' : 'rgba(255,255,255,0.02)',
          color: '#e8e6e3',
          border: featured ? '1px solid rgba(167,139,250,0.12)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          boxShadow: 'none',
          textDecoration: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.12)',
            bgcolor: featured ? 'rgba(167,139,250,0.05)' : 'rgba(255,255,255,0.03)',
            '& .project-image': { transform: 'scale(1.04)' },
            '& .launch-icon': { opacity: 1, transform: 'translate(2px, -2px)' },
          },
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            position: 'relative',
            height: featured ? 200 : 170,
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
              background: 'linear-gradient(to bottom, transparent 30%, rgba(6,6,11,0.85) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography
              component="h3"
              sx={{ fontWeight: 600, color: '#e8e6e3', lineHeight: 1.3, fontSize: '0.95rem', flex: 1 }}
            >
              {title}
            </Typography>
            <LaunchIcon
              className="launch-icon"
              sx={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.25)',
                opacity: 0.5,
                transition: 'all 0.3s ease',
                ml: 1,
                flexShrink: 0,
              }}
            />
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', mb: 1.5 }}>
            {dateStarted} — {dateCompleted}
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.84rem',
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
                  bgcolor: featured ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.04)',
                  color: featured ? '#a78bfa' : 'rgba(255,255,255,0.45)',
                  border: featured ? '1px solid rgba(167,139,250,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.68rem',
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
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.68rem',
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
