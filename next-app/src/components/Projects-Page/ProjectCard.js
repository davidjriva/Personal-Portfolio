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
        height: featured ? '220px' : '180px',
        width: '100%',
        bgcolor: 'background.paper',
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
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 12, 41, 0.65) 100%)',
        }}
      />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description, featured }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant={featured ? 'h6' : 'body1'}
        component="h3"
        sx={{ fontWeight: 700, mb: 0.5, color: '#ffffff', lineHeight: 1.3, fontSize: featured ? '1rem' : '0.9rem' }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.35)', display: 'block', mb: 1.5 }}>
        {dateStarted} – {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.55)',
          lineHeight: 1.6,
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: featured ? '0.85rem' : '0.8rem',
        }}
      >
        {short_description}
      </Typography>
    </Box>
  );
};

const ProjectTech = ({ technologies }) => {
  const allTools = technologies.flatMap((t) => t.tools);
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
      {allTools.map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: 'rgba(56, 192, 242, 0.08)',
            color: '#38c0f2',
            border: '1px solid rgba(56, 192, 242, 0.2)',
            backdropFilter: 'blur(4px)',
            fontSize: '0.7rem',
            height: '22px',
            '&:hover': { bgcolor: 'rgba(56, 192, 242, 0.15)' },
          }}
        />
      ))}
    </Stack>
  );
};

const ProjectFooter = ({ link }) => {
  return (
    <Button
      variant="outlined"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<LaunchIcon fontSize="small" />}
      fullWidth
      sx={{
        mt: 'auto',
        color: '#38c0f2',
        borderColor: 'rgba(56,192,242,0.4)',
        borderRadius: '8px',
        textTransform: 'none',
        fontSize: '0.8rem',
        py: 0.75,
        '&:hover': {
          borderColor: '#38c0f2',
          bgcolor: 'rgba(56, 192, 242, 0.1)',
        },
      }}
    >
      View Project
    </Button>
  );
};

const ProjectCard = forwardRef(
  (
    { coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: featured ? 'rgba(56,192,242,0.04)' : 'rgba(255, 255, 255, 0.03)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
          border: featured ? '1px solid rgba(56, 192, 242, 0.2)' : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: featured ? '0 4px 24px rgba(56,192,242,0.06)' : '0 4px 16px rgba(0,0,0,0.15)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: featured
              ? '0 12px 30px rgba(0,0,0,0.3), 0 0 24px rgba(56, 192, 242, 0.15)'
              : '0 10px 24px rgba(0,0,0,0.25)',
            border: featured ? '1px solid rgba(56, 192, 242, 0.45)' : '1px solid rgba(255,255,255,0.15)',
            '& .project-image': { transform: 'scale(1.05)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: featured ? 3 : 2.5 }}>
          <ProjectHeader
            title={title}
            dateStarted={dateStarted}
            dateCompleted={dateCompleted}
            short_description={short_description}
            featured={featured}
          />
          <ProjectTech technologies={technologies} />
          <ProjectFooter link={link} />
        </CardContent>
      </Card>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
