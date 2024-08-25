import React from 'react';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const Education = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        color: '#757474',
      }}
    >
      <Helmet>
        <title> David Riva | Education </title>
      </Helmet>

      <Typography variant="h4" sx={{ marginBottom: 6, color: '#000', textAlign: 'center' }}>
        Education
      </Typography>

      <Box sx={{ alignSelf: 'flex-start', marginBottom: '2rem', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" sx={{ color: '#000' }}>
            Bachelor of Science
          </Typography>
          <Typography variant="body2" sx={{ color: '#0a73c9', textAlign: 'right' }}>
            August 2021 - May 2024
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <img
            src={'/images/CSU_logo.jpeg'}
            alt={'Colorado State University logo'}
            style={{ height: '24px', marginRight: '8px', alignSelf: 'center' }}
          />
          <Typography variant="body1">Colorado State University | Fort Collins, CO</Typography>
        </Box>

        <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
          Computer Science, Minor in Mathematics
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
          GPA: 4.0
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
          Summa Cum Laude Distinction
        </Typography>
      </Box>
    </Box>
  );
};

export default Education;
