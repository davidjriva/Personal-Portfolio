'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const ProjectImage = ({ coverImage, title, featured }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: featured ? '200px' : '170px',
        width: '100%',
        bgcolor: '#141419',
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
          background: 'linear-gradient(to bottom, transparent 30%, rgba(9, 9, 11, 0.8) 100%)',
        }}
      />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 0.5,
          color: '#F4F4F5',
          lineHeight: 1.3,
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: '#52525B', display: 'block', mb: 1.5, fontSize: '0.72rem', fontWeight: 500 }}>
        {dateStarted} &ndash; {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#71717A',
          lineHeight: 1.65,
          mb: 2,
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
            bgcolor: 'rgba(129, 140, 248, 0.06)',
            color: '#818CF8',
            border: '1px solid rgba(129, 140, 248, 0.12)',
            fontSize: '0.68rem',
            height: '22px',
            fontWeight: 500,
            '& .MuiChip-label': { px: 1 },
          }}
        />
      ))}
    </Stack>
  );
};

const ProjectFooter = ({ link }) => {
  return (
    <Button
      variant="text"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<ArrowOutwardIcon sx={{ fontSize: '0.85rem !important' }} />}
      sx={{
        mt: 'auto',
        color: '#71717A',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        py: 0.75,
        px: 0,
        justifyContent: 'flex-start',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#818CF8',
          backgroundColor: 'transparent',
        },
      }}
    >
      View Project
    </Button>
  );
};

const ProjectCard = forwardRef(
  (
    {
      coverImage,
      title,
      author,
      dateStarted,
      dateCompleted,
      short_description,
      technologies,
      link,
      featured,
      onClick,
      id,
    },
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
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          color: '#F4F4F5',
          border: featured
            ? '1px solid rgba(129, 140, 248, 0.12)'
            : '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: onClick ? 'pointer' : 'default',
          backgroundImage: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid rgba(129, 140, 248, 0.2)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(129, 140, 248, 0.08)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          <ProjectHeader
            title={title}
            dateStarted={dateStarted}
            dateCompleted={dateCompleted}
            short_description={short_description}
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
