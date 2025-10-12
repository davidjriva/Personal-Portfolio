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
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import ClickableLink from '@/components/About-Page/ClickableLink';

const SimpleTimelineItem = ({ title, company, companyWebsiteLink, logoImage, startDate, isEnd }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography variant="body2" sx={{ marginTop: 1.75 }}>
          {startDate}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ backgroundColor: 'white' }}>
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={24}
            height={24}
            style={{ alignSelf: 'center' }}
          />
        </TimelineDot>
        {!isEnd && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ pl: 2, alignItems: 'center' }}>
        <Typography variant="body1" component="span">
          {title} {!title.startsWith('Graduated') && 'at '}
          {!title.startsWith('Graduated') && <ClickableLink link={companyWebsiteLink} text={company} />}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const SimpleTimeline = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => setExperienceData(data));
  }, []);

  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Timeline sx={{ maxWidth: '20vw', paddingTop: 5 }}>
        {sortedExperienceData.map((experience, index) => (
          <React.Fragment key={experience.title}>
            <SimpleTimelineItem {...experience} isEnd={index === sortedExperienceData.length - 1} />
          </React.Fragment>
        ))}
      </Timeline>
    </Box>
  );
};

export default SimpleTimeline;
