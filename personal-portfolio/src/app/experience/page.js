import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import AsyncHelmet from '../../components/AsyncHelmet';
import ExperienceCard from '../../components/Experience/ExperienceCard';
import experienceData from '../../data/experiences.json';

export const metadata = {
  title: 'David Riva | Experience',
};

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
      <AsyncHelmet pageName="Experience" />

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
