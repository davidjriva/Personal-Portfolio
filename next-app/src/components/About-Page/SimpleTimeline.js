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
      <TimelineOppositeContent sx={{ m: 'auto 0', pr: 1, alignItems: 'center', maxWidth: '10vw' }}>
        <Typography variant="body2">{startDate}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ height: '20px' }} />
        <TimelineDot sx={{ backgroundColor: 'white' }}>
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={24}
            height={24}
            style={{ alignSelf: 'center', transition: 'opacity 0.5s ease' }}
          />
        </TimelineDot>
        <TimelineConnector sx={{ height: '20px' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ m: 'auto 0', pl: 2, alignItems: 'center' }}>
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
      {sortedExperienceData.map((experience) => (
        <React.Fragment key={experience.title}>
          <SimpleTimelineItem {...experience} />
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default SimpleTimeline;
