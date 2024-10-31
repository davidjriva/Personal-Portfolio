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
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import experienceData from '@/data/experiences.json';
import Image from 'next/image';

const ExperienceTimelineItem = ({ title, company, logoImage, location, startDate, endDate, bulletPoints }) => {
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
            style={{ alignSelf: 'center', transition: 'opacity 0.5s ease' }}
          />
        </TimelineDot>
        <TimelineConnector sx={{ height: '30px' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '24px', px: 2, transition: 'opacity 0.5s ease' }}>
        <Typography variant="h6" component="span">
          {title}
        </Typography>

        <Typography variant="body1">
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

const ExperienceTimeline = () => {
  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Timeline>
      {sortedExperienceData.map((experience, index) => (
        <React.Fragment key={experience.title}>{<ExperienceTimelineItem {...experience} />}</React.Fragment>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeline;
