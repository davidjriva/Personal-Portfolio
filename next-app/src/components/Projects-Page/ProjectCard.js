'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Card, Button } from '@mui/material';

const ProjectImage = ({ coverImage, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '150px',
        backgroundColor: '#282829',
        overflow: 'hidden',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <Image src={`/images/${coverImage}`} alt={`${title} cover`} style={{ objectFit: 'contain' }} fill sizes="20vw" />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 'bold',
          mb: 1,
          color: '#282829',
          whiteSpace: 'normal',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ mb: 1 }} color="text.secondary">
        {dateStarted} - {dateCompleted}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          color: '#282829',
          whiteSpace: 'normal',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {short_description}
      </Typography>
    </Box>
  );
};

const ProjectFooter = ({ technologies, link }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: '#282829' }}>
        Technologies:
      </Typography>

      <Box>
        {technologies.map((technology, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#282829',
                fontSize: '0.9rem',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              {technology.location}: {technology.tools.join(', ')}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button variant="contained" color="primary" href={link} target="_blank" rel="noopener noreferrer" sx={{ mt: 2 }}>
        View Project
      </Button>
    </Box>
  );
};

const ProjectCard = forwardRef(
  ({ coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link, height }, ref) => {
    const props = { coverImage, title, author, dateStarted, dateCompleted, short_description, technologies, link };

    return (
      <Card
        sx={{
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: '0.3s',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: height || 'auto',
          minWidth: { xs: '300px', sm: '300px', md: '400px' },
        }}
      >
        <ProjectImage {...props} />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <ProjectHeader {...props} />

          <ProjectFooter {...props} />
        </CardContent>
      </Card>
    );
  }
);

export default ProjectCard;
