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
import experienceData from '../../data/experiences.json';
import Image from 'next/image';

const ExperienceTimeLinePlaceholder = ({ yPaddingAmount }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2"></TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ height: '30px' }} />
        <TimelineDot sx={{ backgroundColor: 'lightgray' }} />
        <TimelineConnector sx={{ height: '30px' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: yPaddingAmount }}>
        <Typography variant="h6" component="span" sx={{ visibility: 'hidden' }}>
          Placeholder
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

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
          {title} | {company} | {location}
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollPositions = [1200, 1700, 2100, 2300];
  const yPaddingAmount = ['0px', '125px', '175px', '75px'];

  return (
    <Timeline position="alternate">
      {sortedExperienceData.map((experience, index) => (
        <React.Fragment key={experience.title}>
          {scrollPosition >= scrollPositions[index] ? (
            <ExperienceTimeLineItem {...experience} />
          ) : (
            <ExperienceTimeLinePlaceholder yPaddingAmount={yPaddingAmount[index]} />
          )}
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeLine;
