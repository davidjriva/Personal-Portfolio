'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectImage = ({ coverImage, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '200px',
        width: '100%',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
          opacity: 0.3,
        }}
      />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 'bold',
          mb: 0.5,
          color: 'text.primary',
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        {dateStarted} - {dateCompleted}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          opacity: 0.8,
          lineHeight: 1.6,
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: '1rem',
        }}
      >
        {short_description}
      </Typography>
    </Box>
  );
};

const ProjectTech = ({ technologies }) => {
  // Flatten all tools from different locations into one list for the card view
  const allTools = technologies.flatMap(t => t.tools);

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      {allTools.map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            color: 'text.primary',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            backdropFilter: 'blur(4px)',
            '&:hover': {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
            },
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
      endIcon={<LaunchIcon />}
      fullWidth
      sx={{
        mt: 'auto',
        color: 'text.primary',
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
        borderRadius: '8px',
        textTransform: 'none',
        '&:hover': {
          borderColor: 'text.primary',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
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
      onClick,
      id,
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'}`,
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.08)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 12px 30px rgba(0,0,0,0.3)' : '0 12px 30px rgba(0,0,0,0.15)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'}`,
            '& .project-image': {
              transform: 'scale(1.05)',
            },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
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

export default ProjectCard;

