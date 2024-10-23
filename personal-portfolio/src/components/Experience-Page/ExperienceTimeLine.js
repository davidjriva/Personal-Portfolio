'use client';

import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from '@mui/lab';
import React from 'react';
import { Typography } from '@mui/material';
import experienceData from '../../data/experiences.json';
import Image from 'next/image';

const ExperienceTimeLineItem = ({ title, company, logoImage, location, startDate, endDate, bulletPoints }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2">
        {startDate} - {endDate}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ height: '30px' }} />
        <TimelineDot sx={{ backgroundColor: 'white' }}>
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={24}
            height={24}
            style={{ alignSelf: 'center' }}
          />
        </TimelineDot>
        <TimelineConnector sx={{ height: '30px' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '24px', px: 2 }}>
        <Typography variant="h6" component="span">
          {title}
          {company} | {location}
        </Typography>
        {bulletPoints.map((bulletPt, index) => (
          <Typography key={index} variant="body1">
            • {bulletPt}
          </Typography>
        ))}
      </TimelineContent>
    </TimelineItem>
  );
};

const ExperienceTimeLine = () => {
  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Timeline position="alternate">
      {sortedExperienceData.map((experience) => (
        <React.Fragment key={experience.title}>
          <ExperienceTimeLineItem {...experience} />
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeLine;
