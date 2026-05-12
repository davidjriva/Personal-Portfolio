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

const SimpleTimelineItem = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, isEnd }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ flex: 'none', width: 120, pr: 1.5, pt: '14px' }}>
        <Typography
          variant="caption"
          sx={{
            color: isCurrent ? '#3b82f6' : '#52525b',
            fontWeight: isCurrent ? 600 : 400,
            lineHeight: 1.4,
            display: 'block',
            fontSize: '0.72rem',
          }}
        >
          {isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`}
        </Typography>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: '#fafafa',
            border: isCurrent ? '1.5px solid rgba(59,130,246,0.5)' : '1.5px solid rgba(255,255,255,0.15)',
            boxShadow: isCurrent ? '0 0 12px 2px rgba(59,130,246,0.2)' : 'none',
            p: '5px',
            m: '6px 0',
          }}
        >
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={18}
            height={18}
            style={{ display: 'block', objectFit: 'contain' }}
          />
        </TimelineDot>
        {!isEnd && (
          <TimelineConnector
            sx={{
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.2), rgba(139,92,246,0.1))',
              width: '1px',
            }}
          />
        )}
      </TimelineSeparator>

      <TimelineContent sx={{ pl: 1.5, pt: '10px', pb: '16px' }}>
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '0.8rem',
              lineHeight: 1.35,
              color: '#fafafa',
              mb: 0.25,
            }}
          >
            {isGraduation ? 'Graduated' : title.split(',')[0]}
          </Typography>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            variant="caption"
            sx={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '0.72rem',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 },
            }}
          >
            {company}
          </Typography>
        </Box>
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
    <Timeline sx={{ p: 0, m: 0 }}>
      {sortedExperienceData.map((experience, index) => (
        <React.Fragment key={experience.title}>
          <SimpleTimelineItem {...experience} isEnd={index === sortedExperienceData.length - 1} />
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default SimpleTimeline;
