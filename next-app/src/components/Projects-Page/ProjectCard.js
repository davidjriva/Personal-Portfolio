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
        bgcolor: '#18181b',
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.8) 100%)',
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
        sx={{
          fontWeight: 600,
          mb: 0.5,
          color: '#fafafa',
          lineHeight: 1.3,
          fontSize: featured ? '1rem' : '0.9rem',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: '#52525b', display: 'block', mb: 1.5, fontSize: '0.72rem' }}>
        {dateStarted} – {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#71717a',
          lineHeight: 1.6,
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: featured ? '0.82rem' : '0.78rem',
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
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
      {allTools.map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: 'rgba(59,130,246,0.06)',
            color: '#60a5fa',
            border: '1px solid rgba(59,130,246,0.12)',
            fontSize: '0.68rem',
            height: '22px',
            fontWeight: 500,
            '&:hover': { bgcolor: 'rgba(59,130,246,0.12)' },
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
      endIcon={<LaunchIcon sx={{ fontSize: '0.85rem !important' }} />}
      fullWidth
      sx={{
        mt: 'auto',
        color: '#a1a1aa',
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        py: 0.75,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(59,130,246,0.4)',
          bgcolor: 'rgba(59,130,246,0.06)',
          color: '#60a5fa',
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
          bgcolor: 'rgba(255,255,255,0.03)',
          color: '#fafafa',
          border: featured ? '1px solid rgba(59,130,246,0.12)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
            '& .project-image': { transform: 'scale(1.04)' },
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
