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
        style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(7, 7, 10, 0.8) 100%)',
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
        sx={{ fontWeight: 700, mb: 0.5, color: '#f5f5f7', lineHeight: 1.3, fontSize: featured ? '1rem' : '0.9rem' }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mb: 1.5 }}>
        {dateStarted} – {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255,255,255,0.5)',
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
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
      {allTools.map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: 'rgba(139,92,246,0.07)',
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(139,92,246,0.12)',
            fontSize: '0.7rem',
            height: '22px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.25)' },
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
        color: 'rgba(255,255,255,0.6)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        py: 0.85,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(139,92,246,0.5)',
          color: '#a78bfa',
          bgcolor: 'rgba(139,92,246,0.06)',
        },
      }}
    >
      View Project
    </Button>
  );
};

const ProjectCard = forwardRef(
  ({ coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link, featured, onClick, id }, ref) => {
    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: featured ? 'rgba(139,92,246,0.03)' : 'rgba(255,255,255,0.02)',
          color: '#f5f5f7',
          backdropFilter: 'blur(10px)',
          border: featured ? '1px solid rgba(139,92,246,0.15)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '18px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: featured
              ? '0 16px 40px rgba(139,92,246,0.08)'
              : '0 12px 32px rgba(0,0,0,0.2)',
            borderColor: featured ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.12)',
            '& .project-image': { transform: 'scale(1.03)' },
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
