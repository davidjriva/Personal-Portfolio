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

const SimpleTimelineItem = ({ title, company, logoImage, startDate }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2">
        {startDate}
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
        <Typography variant="body1" component="span">
          {title} at {company}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const SimpleTimeline = () => {
  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Timeline>
      {sortedExperienceData.map((experience, index) => (
        <React.Fragment key={experience.title}>{<SimpleTimelineItem {...experience} />}</React.Fragment>
      ))}
    </Timeline>
  );
};

export default SimpleTimeline;
