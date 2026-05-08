'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

const TimelineEntry = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, isLast }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          pt: '4px',
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: isCurrent ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={18}
            height={18}
            style={{ display: 'block', objectFit: 'contain' }}
          />
        </Box>
        {!isLast && (
          <Box
            sx={{
              width: '1px',
              flex: 1,
              mt: 1,
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)',
            }}
          />
        )}
      </Box>

      <Box sx={{ pb: isLast ? 0 : 3, pt: '2px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.82rem',
            lineHeight: 1.35,
            color: '#F4F4F5',
            mb: 0.25,
          }}
        >
          {isGraduation ? 'Graduated' : title.split(',')[0]}
        </Typography>
        <Typography
          component="a"
          href={companyWebsiteLink}
          target="_blank"
          rel="noopener"
          sx={{
            color: '#818CF8',
            textDecoration: 'none',
            fontSize: '0.72rem',
            fontWeight: 500,
            display: 'block',
            mb: 0.5,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {company}
        </Typography>
        <Typography
          sx={{
            color: isCurrent ? '#818CF8' : '#52525B',
            fontSize: '0.68rem',
            fontWeight: isCurrent ? 500 : 400,
          }}
        >
          {isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`}
        </Typography>
      </Box>
    </Box>
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
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        p: 3,
        minWidth: 240,
        maxWidth: 280,
      }}
    >
      <Typography
        sx={{
          color: '#52525B',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 2.5,
        }}
      >
        Experience
      </Typography>
      {sortedExperienceData.map((experience, index) => (
        <TimelineEntry
          key={experience.title}
          {...experience}
          isLast={index === sortedExperienceData.length - 1}
        />
      ))}
    </Box>
  );
};

export default SimpleTimeline;
