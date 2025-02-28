import { forwardRef } from 'react';
import Image from 'next/image';
import { Typography, Box, Button } from '@mui/material';

const ProjectImage = ({ coverImage, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100px',
        backgroundColor: '#282829',
        overflow: 'hidden',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <Image src={`/images/${coverImage}`} alt={`${title} cover`} style={{ objectFit: 'cover' }} fill sizes="20vw" />
    </Box>
  );
};

const ProjectHeader = ({ title, dateStarted, dateCompleted, short_description }) => {
  return (
    <Box sx={{ mb: 1, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto', // Ensure it adjusts to the height of the content
          flexDirection: 'column', // Stack the title and description vertically
          textAlign: 'center', // Ensures text is centered horizontally within the flex container
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1, color: '#282829' }}>
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: '#282829',
          overflow: 'hidden', // Prevents overflow beyond the container
          textOverflow: 'ellipsis', // Adds ellipsis when the content overflows
          display: '-webkit-box', // Required for multi-line truncation
          WebkitLineClamp: 3, // Specifies the number of lines before truncation
          lineHeight: '1.7em', // Adjusts the line height for multi-line effect
          width: '100%', // Ensures the text respects the container width
          maxHeight: '5.1em', // Adjusts maxHeight based on lineHeight for better truncation
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
      <Box>
        {technologies.slice(0, 2).map((technology, index) => (
          <Box key={index}>
            <Typography variant="body1" sx={{ color: '#282829', fontSize: '0.9rem' }}>
              {technology.location}: {technology.tools.join(', ')}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button variant="contained" color="primary" href={link} target="_blank" rel="noopener noreferrer" sx={{ mt: 1 }}>
        View Project
      </Button>
    </Box>
  );
};

const Card = forwardRef(({ id, frontSrc, frontAlt, projectData }, ref) => {
  const { title, coverImage, dateStarted, dateCompleted, short_description, technologies, link } = projectData;

  console.log(projectData);
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Image priority src={frontSrc} width={500} height={500} alt={frontAlt} />
          </div>
          <div className="flip-card-back">
            <ProjectImage coverImage={coverImage} title={title} />
            <ProjectHeader
              title={title}
              dateStarted={dateStarted}
              dateCompleted={dateCompleted}
              short_description={short_description}
            />
            <ProjectFooter technologies={technologies} link={link} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
