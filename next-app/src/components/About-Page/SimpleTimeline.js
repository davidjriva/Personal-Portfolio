'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import RevealOnScroll from '@/components/RevealOnScroll';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, index }) => {
  const isCurrent = endDate === 'Present' || (new Date(endDate) > new Date('2026-01-01'));
  const isGraduation = title.startsWith('Graduated');

  return (
    <RevealOnScroll
      delay={index * 0.08}
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 3 },
        p: { xs: 2.5, md: 3 },
        bgcolor: '#131316',
        border: isCurrent ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        '&:hover': {
          borderColor: isCurrent ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          bgcolor: '#1c1c21',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Image
          src={`/images/${logoImage}`}
          alt={`${company} logo`}
          width={24}
          height={24}
          style={{ display: 'block', objectFit: 'contain' }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#f4f4f5', lineHeight: 1.3 }}>
              {isGraduation ? 'Graduated, Summa Cum Laude' : title.split(',')[0]}
            </Typography>
            <Typography
              component="a"
              href={companyWebsiteLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.82rem',
                color: '#6366f1',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {company}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: isCurrent ? '#818cf8' : '#6b7280',
              fontWeight: isCurrent ? 500 : 400,
              whiteSpace: 'nowrap',
            }}
          >
            {isGraduation ? startDate : `${startDate} — ${endDate}`}
          </Typography>
        </Box>
      </Box>
    </RevealOnScroll>
  );
};

const Experience = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
      <SectionHeading sectionName="Experience" />

      <Box sx={{ maxWidth: 800, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {sorted.map((exp, i) => (
          <ExperienceCard key={exp.title} {...exp} index={i} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
