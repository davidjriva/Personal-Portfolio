import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import AwardCard from './AwardCard';
import awardsData from '../data/awards.json';

const Awards = () => {
  return (
    <Box sx={{ padding: '2rem', color: '#757474' }}>
      <Helmet>
        <title> David Riva | Awards </title>
      </Helmet>

      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#000', textAlign: 'center' }}>
        Awards
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.6 }}>
        {awardsData.map((award, index) => (
          <React.Fragment key={award.title}>
            <AwardCard {...award} />
            {index < awardsData.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Awards;
