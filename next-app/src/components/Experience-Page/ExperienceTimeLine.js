'use client';

import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from '@mui/lab';
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
            style={{ alignSelf: 'center' }}
          />
        </TimelineDot>
        <TimelineConnector sx={{ height: '30px' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '24px', px: 2 }}>
        <Typography variant="h6" component="span">
          {title}
        </Typography>

        <Typography variant="body1">
          {company} | {location}
        </Typography>

        {bulletPoints &&
          bulletPoints.map((bulletPt, index) => (
            <Typography key={index} variant="body1">
              • {bulletPt}
            </Typography>
          ))}
      </TimelineContent>
    </TimelineItem>
  );
};

const ExperienceTimeline = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Timeline sx={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
      {sortedExperienceData.map((experience) => (
        <React.Fragment key={experience.title}>
          <ExperienceTimelineItem {...experience} />
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeline;
