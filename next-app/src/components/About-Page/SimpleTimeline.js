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
import { Typography, Box, IconButton } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import experienceData from '@/data/experiences.json';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
          {title} at{' '}
          <a
            href={companyWebsiteLink}
            target="_blank"
            style={{ color: '#38c0f2', textDecoration: 'none' }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {company}
          </a>
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const SimpleTimeline = () => {
  const sortedExperienceData = [...experienceData].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Timeline sx={{ maxWidth: '20vw', paddingTop: 5 }}>
        {sortedExperienceData.map((experience, index) => (
          <React.Fragment key={experience.title}>
            <SimpleTimelineItem {...experience} isEnd={index === sortedExperienceData.length - 1} />
          </React.Fragment>
        ))}
      </Timeline>

      <IconButton sx={{ color: '#38c0f2' }} onClick={() => router.push('/experience')}>
        <Typography sx={{ color: '#38c0f2' }}> See Full Timeline </Typography>
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default SimpleTimeline;
