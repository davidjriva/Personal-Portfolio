'use client';

import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');
  const displayTitle = isGraduation ? 'Graduated' : title.split(',')[0];
  const dateText = isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`;

  return (
    <Box
      component="a"
      href={companyWebsiteLink}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.06)',
        bgcolor: 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        minWidth: { xs: '280px', md: 'auto' },
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
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
          width={24}
          height={24}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#fafafa',
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {displayTitle}
        </Typography>
        <Typography sx={{ fontSize: '0.78rem', color: '#38bdf8', lineHeight: 1.3, mb: 0.25 }}>
          {company}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#52525b', lineHeight: 1.3 }}>
          {dateText}
        </Typography>
      </Box>
      {isCurrent && (
        <Box
          sx={{
            ml: 'auto',
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#22c55e',
            flexShrink: 0,
            boxShadow: '0 0 8px rgba(34,197,94,0.4)',
          }}
        />
      )}
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

  const sortedExperienceData = [...experienceData].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  if (sortedExperienceData.length === 0) return null;

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#52525b',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          mb: 2,
        }}
      >
        Experience
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 1.5,
        }}
      >
        {sortedExperienceData.map((exp) => (
          <ExperienceCard key={exp.title} {...exp} />
        ))}
      </Box>
    </Box>
  );
};

export default SimpleTimeline;
