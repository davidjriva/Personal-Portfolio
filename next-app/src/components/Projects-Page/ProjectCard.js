'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectImage = ({ coverImage, title, featured }) => (
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
      style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className="project-image"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 10, 20, 0.8) 100%)',
      }}
    />
  </Box>
);

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
          bgcolor: featured ? 'rgba(56,192,242,0.02)' : 'rgba(255, 255, 255, 0.02)',
          color: '#f0f0f5',
          border: featured ? '1px solid rgba(56, 192, 242, 0.12)' : '1px solid rgba(255,255,255,0.05)',
          borderRadius: '18px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: featured ? '1px solid rgba(56, 192, 242, 0.25)' : '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: featured ? 2.5 : 2.5 }}>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              component="h3"
              sx={{ fontWeight: 700, mb: 0.5, color: '#f0f0f5', lineHeight: 1.3, fontSize: featured ? '0.95rem' : '0.9rem' }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: 'rgba(240,240,245,0.3)', fontSize: '0.7rem', fontWeight: 500, mb: 1.5 }}>
              {dateStarted} &ndash; {dateCompleted}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(240,240,245,0.5)',
                lineHeight: 1.65,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '0.8rem',
              }}
            >
              {short_description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
            {allTools.map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(56, 192, 242, 0.06)',
                  color: 'rgba(56, 192, 242, 0.8)',
                  border: '1px solid rgba(56, 192, 242, 0.12)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  height: '22px',
                  borderRadius: '6px',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            ))}
          </Stack>

          <Button
            variant="outlined"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
            fullWidth
            sx={{
              mt: 'auto',
              color: 'rgba(240,240,245,0.6)',
              borderColor: 'rgba(255,255,255,0.08)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.78rem',
              fontWeight: 500,
              py: 0.75,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(56,192,242,0.3)',
                color: '#38c0f2',
                bgcolor: 'rgba(56, 192, 242, 0.04)',
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
