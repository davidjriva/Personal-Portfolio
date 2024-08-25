import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ExperienceCard from './ExperienceCard';
import experienceData from '../data/experiences.json';

const Experience = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem',
        color: '#757474',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 6, color: '#000' }}>
        Experience
      </Typography>

      {experienceData.map((experience) => (
        <React.Fragment key={experience.title}>
          <ExperienceCard {...experience} />
          <Divider sx={{ marginBottom: 2 }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Experience;
