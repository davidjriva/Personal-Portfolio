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
          color: '#e8e6e3',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            bgcolor: 'rgba(255, 255, 255, 0.035)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            '& .project-image': { transform: 'scale(1.04)' },
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
              background: 'linear-gradient(to bottom, rgba(10,10,15,0) 40%, rgba(10,10,15,0.8) 100%)',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#e8e6e3',
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {title}
            </Typography>
            <ArrowOutwardIcon
              className="arrow-icon"
              sx={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.3)',
                ml: 1,
                opacity: 0,
                transition: 'all 0.2s ease',
                flexShrink: 0,
                mt: 0.25,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.25)',
              mb: 1.5,
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}
          >
            {dateStarted} — {dateCompleted}
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.45)',
              lineHeight: 1.6,
              mb: 2,
              fontSize: '0.82rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {short_description}
          </Typography>

          {/* Tech tags */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {allTools.slice(0, 5).map((tool, index) => (
              <Chip
                key={index}
                label={tool}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.04)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
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
                  bgcolor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontSize: '0.65rem',
                  height: '22px',
                  fontWeight: 500,
                  border: 'none',
                  '& .MuiChip-label': { px: 0.5 },
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
