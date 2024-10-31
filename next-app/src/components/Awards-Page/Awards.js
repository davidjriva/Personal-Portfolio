import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import AwardCard from './AwardCard';
import SectionHeading from '@/components/SectionHeading';
import awardsData from '@/data/awards.json';

export const metadata = {
  title: 'David Riva | Awards',
};

const Awards = () => {
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
      <SectionHeading sectionName="Awards" />

      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.6 }}>
        {awardsData.map((award, index) => (
          <React.Fragment key={award.title}>
            <AwardCard {...award} />
            {index < awardsData.length - 1 && <Divider sx={{ backgroundColor: 'lightgray' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Awards;
