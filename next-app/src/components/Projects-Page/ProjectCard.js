'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

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
          bgcolor: 'rgba(255,255,255,0.02)',
          color: '#fafafa',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.12)',
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
            '& .project-image': { transform: 'scale(1.03)' },
          },
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            position: 'relative',
            height: featured ? '200px' : '170px',
            width: '100%',
            bgcolor: '#18181b',
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
              background: 'linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.9) 100%)',
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.5, md: 3 } }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h3"
              sx={{ fontWeight: 600, fontSize: '1rem', color: '#fafafa', lineHeight: 1.3, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: '#52525b', fontSize: '0.78rem', mb: 1.5 }}>
              {dateStarted} – {dateCompleted}
            </Typography>
            <Typography
              sx={{
                color: '#71717a',
                lineHeight: 1.65,
                fontSize: '0.85rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {short_description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
            {allTools.map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(56,189,248,0.06)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56,189,248,0.12)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  height: '22px',
                  borderRadius: '6px',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            ))}
          </Stack>

          <Button
            variant="text"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              mt: 'auto',
              color: '#71717a',
              textTransform: 'none',
              fontSize: '0.8rem',
              fontWeight: 500,
              justifyContent: 'flex-start',
              p: 0,
              minWidth: 'auto',
              transition: 'color 0.2s ease',
              '&:hover': {
                bgcolor: 'transparent',
                color: '#38bdf8',
              },
            }}
          >
            View Project
          </Button>
        </Box>
      </Card>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
