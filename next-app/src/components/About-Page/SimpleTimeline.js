'use client';

import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

const TimelineEntry = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, isLast }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
      {/* Connector line */}
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            left: 15,
            top: 36,
            bottom: -8,
            width: '1px',
            bgcolor: 'rgba(232, 230, 227, 0.06)',
          }}
        />
      )}

      {/* Logo dot */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          bgcolor: '#fff',
          border: isCurrent ? '1.5px solid rgba(212, 160, 83, 0.5)' : '1px solid rgba(232, 230, 227, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isCurrent ? '0 0 12px rgba(212, 160, 83, 0.15)' : 'none',
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

      {/* Content */}
      <Box sx={{ pb: 3 }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '0.82rem',
            lineHeight: 1.35,
            color: '#e8e6e3',
            mb: 0.25,
          }}
        >
          {isGraduation ? 'Graduated' : title.split(',')[0]}
        </Typography>
        <Typography
          component="a"
          href={companyWebsiteLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#d4a053',
            textDecoration: 'none',
            fontSize: '0.72rem',
            fontWeight: 500,
            display: 'block',
            mb: 0.25,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {company}
        </Typography>
        <Typography
          sx={{
            color: isCurrent ? 'rgba(212, 160, 83, 0.7)' : 'rgba(232, 230, 227, 0.3)',
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

  const sorted = [...experienceData].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box
      sx={{
        bgcolor: 'rgba(232, 230, 227, 0.02)',
        border: '1px solid rgba(232, 230, 227, 0.06)',
        borderRadius: '16px',
        p: 3,
      }}
    >
      <Typography
        sx={{
          color: 'rgba(232, 230, 227, 0.4)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 2.5,
        }}
      >
        Experience
      </Typography>

      {sorted.map((exp, index) => (
        <TimelineEntry key={exp.title} {...exp} isLast={index === sorted.length - 1} />
      ))}
    </Box>
  );
};

export default SimpleTimeline;
