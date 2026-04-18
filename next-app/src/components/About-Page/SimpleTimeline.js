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
      <TimelineOppositeContent sx={{ flex: 'none', width: 130, pr: 1.5, pt: '14px' }}>
        <Typography
          variant="caption"
          sx={{
            color: isCurrent ? '#38c0f2' : 'rgba(255,255,255,0.45)',
            fontWeight: isCurrent ? 600 : 400,
            lineHeight: 1.4,
            display: 'block',
          }}
        >
          {isGraduation ? startDate : `${startDate} –\u00a0${isCurrent ? 'Present' : endDate}`}
        </Typography>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: '#ffffff',
            border: isCurrent
              ? '1.5px solid rgba(56,192,242,0.6)'
              : '1.5px solid rgba(255,255,255,0.2)',
            boxShadow: isCurrent ? '0 0 10px 2px rgba(56,192,242,0.25)' : 'none',
            p: '5px',
            m: '6px 0',
          }}
        >
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={20}
            height={20}
            style={{ display: 'block', objectFit: 'contain' }}
          />
        </TimelineDot>
        {!isEnd && (
          <TimelineConnector
            sx={{
              background: 'linear-gradient(to bottom, rgba(56,192,242,0.25), rgba(110,64,201,0.15))',
              width: '1.5px',
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
              color: '#ffffff',
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
              color: '#38c0f2',
              textDecoration: 'none',
              fontSize: '0.72rem',
              '&:hover': { textDecoration: 'underline' },
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        px: 1,
        py: 2,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: '0.85rem',
          letterSpacing: '0.18em',
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        Experience
      </Typography>
      <Timeline sx={{ maxWidth: '22vw', p: 0, m: 0 }}>
        {sortedExperienceData.map((experience, index) => (
          <React.Fragment key={experience.title}>
            <SimpleTimelineItem
              {...experience}
              isEnd={index === sortedExperienceData.length - 1}
            />
          </React.Fragment>
        ))}
      </Timeline>
    </Box>
  );
};

export default SimpleTimeline;
