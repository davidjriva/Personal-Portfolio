'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box
      sx={{
        minWidth: { xs: 220, sm: 240 },
        maxWidth: 280,
        p: 2.5,
        borderRadius: '14px',
        background: isCurrent ? 'rgba(129, 140, 248, 0.04)' : 'rgba(255, 255, 255, 0.02)',
        border: isCurrent ? '1px solid rgba(129, 140, 248, 0.15)' : '1px solid rgba(255, 255, 255, 0.06)',
        flexShrink: 0,
        transition: 'all 0.25s ease',
        '&:hover': {
          background: 'rgba(129, 140, 248, 0.06)',
          borderColor: 'rgba(129, 140, 248, 0.2)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={22}
            height={22}
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            sx={{
              color: '#fafafa',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.82rem',
              display: 'block',
              lineHeight: 1.3,
              '&:hover': { color: '#818cf8' },
            }}
          >
            {company}
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '0.78rem',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: 1.4,
          mb: 1,
        }}
      >
        {isGraduation ? 'Graduated' : title.split(',')[0]}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: isCurrent ? '#818cf8' : 'rgba(255, 255, 255, 0.3)',
          fontWeight: isCurrent ? 500 : 400,
          fontSize: '0.72rem',
        }}
      >
        {isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`}
      </Typography>
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

  if (sortedExperienceData.length === 0) return null;

  return (
    <Box>
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 2,
        }}
      >
        Experience
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 2,
          },
        }}
      >
        {sortedExperienceData.map((experience) => (
          <ExperienceCard key={experience.title} {...experience} />
        ))}
      </Box>
    </Box>
  );
};

export default SimpleTimeline;
