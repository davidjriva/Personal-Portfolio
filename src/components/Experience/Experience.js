import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import ExperienceCard from './ExperienceCard';
import experienceData from '../../data/experiences.json';

const Experience = () => {
  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        color: '#757474',
      }}
    >
      <Helmet>
        <title> David Riva | Experience </title>
      </Helmet>

      <Typography variant="h4" sx={{ marginBottom: 6, color: '#000', textAlign: 'center' }}>
        Experience
      </Typography>

      {sortedExperienceData.map((experience) => (
        <React.Fragment key={experience.title}>
          <ExperienceCard {...experience} />
          <Divider sx={{ marginBottom: 2 }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Experience;
