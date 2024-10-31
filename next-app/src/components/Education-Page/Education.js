import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';

const Education = () => {
  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 10,
      }}
    >
      <SectionHeading sectionName="Education" />

      <Box
        sx={{
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: 10,
          padding: 2,
          border: '1px solid lightgray',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h5">Bachelor of Science</Typography>
          <Typography variant="body2">August 2021 - May 2024</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <img
            src={'/images/CSU_logo.jpeg'}
            alt={'Colorado State University logo'}
            style={{ height: '24px', marginRight: '8px', alignSelf: 'center', backgroundColor: 'white' }}
          />
          <Typography variant="body1">Colorado State University | Fort Collins, CO</Typography>
        </Box>

        <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>
          Computer Science, Minor in Mathematics
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>
          GPA: 4.0
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.75rem' }}>
          Summa Cum Laude Distinction
        </Typography>
      </Box>
    </Box>
  );
};

export default Education;
