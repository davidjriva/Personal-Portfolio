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
        height: featured ? 200 : 170,
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.02)',
      }}
    >
      <Image
        src={`/images/${coverImage}`}
        alt={`${title} cover`}
        style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
        className="project-image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(9, 9, 11, 0.8) 100%)',
        }}
      />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description, featured }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="h3"
        sx={{
          fontWeight: 600,
          mb: 0.5,
          color: '#fafafa',
          lineHeight: 1.3,
          fontSize: featured ? '0.95rem' : '0.88rem',
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.75rem', fontWeight: 500, display: 'block', mb: 1.5 }}>
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
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
      {allTools.slice(0, 6).map((tool, index) => (
        <Chip
          key={index}
          label={tool}
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.04)',
            color: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            fontSize: '0.68rem',
            height: '22px',
            fontWeight: 500,
            '& .MuiChip-label': { px: 1 },
          }}
        />
      ))}
      {allTools.length > 6 && (
        <Chip
          label={`+${allTools.length - 6}`}
          size="small"
          sx={{
            bgcolor: 'transparent',
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '0.68rem',
            height: '22px',
            fontWeight: 500,
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
      )}
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
      fullWidth
      sx={{
        mt: 'auto',
        color: 'rgba(255,255,255,0.5)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        py: 0.75,
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(129, 140, 248, 0.3)',
          color: '#a5b4fc',
          bgcolor: 'rgba(129, 140, 248, 0.05)',
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
          bgcolor: featured ? 'rgba(129, 140, 248, 0.03)' : 'rgba(255, 255, 255, 0.02)',
          color: '#fafafa',
          border: featured ? '1px solid rgba(129, 140, 248, 0.12)' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: featured ? 'rgba(129, 140, 248, 0.3)' : 'rgba(255,255,255,0.14)',
            bgcolor: featured ? 'rgba(129, 140, 248, 0.05)' : 'rgba(255, 255, 255, 0.035)',
            '& .project-image': { transform: 'scale(1.04)' },
          },
        }}
        onClick={onClick}
      >
        <ProjectImage coverImage={coverImage} title={title} featured={featured} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5, '&:last-child': { pb: 2.5 } }}>
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
