'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Grid } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints, isActive }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');
  const displayTitle = isGraduation ? 'Graduated Summa Cum Laude' : title;
  const dateRange = isGraduation ? startDate : `${startDate} — ${endDate}`;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 3 },
        p: { xs: 2.5, md: 3 },
        borderRadius: '16px',
        background: isActive ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.02)',
        border: isActive ? '1px solid rgba(59,130,246,0.15)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.1)',
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.04)',
        }}
      >
        <Image
          src={`/images/${logoImage}`}
          alt={`${company} logo`}
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
          <Box>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#fafafa', lineHeight: 1.3 }}>
              {displayTitle}
            </Typography>
            <Typography
              component="a"
              href={companyWebsiteLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.8rem',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {company}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontSize: '0.72rem', color: isCurrent ? '#3b82f6' : '#52525b', fontWeight: isCurrent ? 600 : 400 }}>
              {dateRange}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#3f3f46' }}>
              {location}
            </Typography>
          </Box>
        </Box>

        {bulletPoints && bulletPoints.length > 0 && (
          <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2, listStyleType: 'none' }}>
            {bulletPoints.slice(0, 3).map((point, idx) => (
              <Box
                component="li"
                key={idx}
                sx={{
                  fontSize: '0.78rem',
                  color: '#71717a',
                  lineHeight: 1.6,
                  mb: 0.75,
                  position: 'relative',
                  pl: 1.5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '0.5em',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'rgba(59,130,246,0.4)',
                  },
                }}
              >
                {point}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperiences(sorted);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Experience" subtitle="Where I've worked" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.title} {...exp} isActive={index === 0} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
