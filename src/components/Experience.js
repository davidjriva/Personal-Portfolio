import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

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
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
        Experience
      </Typography>

      <Box sx={{ marginBottom: '2rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
            Research Assistant - Full-stack Developer
          </Typography>
          <Typography variant="body2" sx={{ color: '#0a73c9', fontWeight: 400 }}>
            December 2022 - January 2024
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem', fontWeight: 400 }}>
          Colorado State University | Fort Collins, CO
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Developer on the Urban Sustain Project, creating an accessible interface to datasets consisting of 20TB or
          greater, catering to social and environmental researchers.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Built geospatial data visualizations using React, JavaScript, TypeScript, HTML, and CSS for the frontend,
          complemented by Python, Flask, and MongoDB for backend development.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Won the Excellence in Data Science Award from CSU's Celebrating Undergraduate Research Competition.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Managed source control, met deadlines, and attended weekly Scrum meetings in collaboration with a team of 12
          individuals.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Designed visualization components, including interactive charts and a map interface, enabling intuitive data
          exploration across multiple datasets.
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: '2rem' }} />

      <Box sx={{ marginBottom: '2rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
            Data Science Intern
          </Typography>
          <Typography variant="body2" sx={{ color: '#0a73c9', fontWeight: 400 }}>
            May 2023 - August 2023
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem', fontWeight: 400 }}>
          Hewlett Packard Inc. | Vancouver, WA
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Developed & maintained three ETL data pipelines, extracting data from AWS S3 buckets, transforming it, and
          loading it into the AWS RedShift cloud data warehouse for long-term storage.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Developed expertise in data transformation, filtering, and verification using SQL & Python within a
          relational database.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Applied machine learning modeling and forecasting techniques with Scikit-Learn & Facebook Prophet, along
          with data visualization using Matplotlib & Seaborn.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Developed RESTful APIs & wrappers.
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: '2rem' }} />

      <Box sx={{ marginBottom: '2rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
            Teaching Assistant
          </Typography>
          <Typography variant="body2" sx={{ color: '#0a73c9', fontWeight: 400 }}>
            August 2022 - December 2022
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem', fontWeight: 400 }}>
          Colorado State University | Fort Collins, CO
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Instructed and supervised lab sessions for CS-165 Data Structures & Algorithms, demonstrating effective
          leadership and teaching abilities to a group of 30 students.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Conveyed complex technical concepts in a clear and accessible way.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          • Personalized problem-solving during individualized office hours & managed course curriculum.
        </Typography>
      </Box>
    </Box>
  );
};

export default Experience;
