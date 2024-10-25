import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'David Riva | Education',
};

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
      }}
    >
      <SectionHeading sectionName="Education" />

      <Box
        sx={{
          alignSelf: 'flex-start',
          marginTop: 10,
          marginLeft: 10,
          width: '40%', // Ensure full width for spacing
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Align items to the ends
            alignItems: 'center', // Center align vertically
            marginBottom: '1rem', // Increased spacing between section title and dates
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
