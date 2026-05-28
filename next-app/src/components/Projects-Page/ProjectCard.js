'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
      className="project-image"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(5, 5, 7, 0.8) 100%)',
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
          bgcolor: 'rgba(255, 255, 255, 0.025)',
          color: '#fafafa',
          border: featured ? '1px solid rgba(56, 192, 242, 0.12)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(56, 192, 242, 0.3)' : 'rgba(255,255,255,0.12)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.5, md: 3 } }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h3"
              sx={{ fontWeight: 700, mb: 0.5, color: '#fafafa', lineHeight: 1.3, fontSize: featured ? '1rem' : '0.9rem' }}
            >
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.25)', display: 'block', mb: 1.5 }}>
              {dateStarted} – {dateCompleted}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.6,
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

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
            {allTools.map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.65rem',
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
            endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
            fullWidth
            sx={{
              mt: 'auto',
              color: 'rgba(255,255,255,0.5)',
              borderColor: 'rgba(255,255,255,0.08)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.78rem',
              fontWeight: 500,
              py: 0.75,
              '&:hover': {
                borderColor: '#38c0f2',
                color: '#38c0f2',
                bgcolor: 'rgba(56, 192, 242, 0.06)',
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
