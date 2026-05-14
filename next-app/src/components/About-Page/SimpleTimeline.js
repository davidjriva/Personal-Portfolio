'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import FadeInSection from '@/components/FadeInSection';
import SectionHeading from '@/components/SectionHeading';

const TimelineEntry = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, bulletPoints, delay }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <FadeInSection delay={delay}>
      <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, pb: 5, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 48 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              bgcolor: isCurrent ? 'rgba(56,192,242,0.1)' : 'rgba(255,255,255,0.04)',
              border: isCurrent ? '1px solid rgba(56,192,242,0.25)' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: isCurrent ? '0 0 16px rgba(56,192,242,0.12)' : 'none',
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
          <Box
            sx={{
              flex: 1,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
              mt: 1.5,
            }}
          />
        </Box>

        <Box sx={{ flex: 1, pt: 0.25 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#fafafa', mb: 0.25 }}>
            {isGraduation ? 'Graduated' : title.split(',')[0]}
          </Typography>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#38c0f2',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'inline-block',
              mb: 0.5,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {company}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isCurrent ? 'rgba(56,192,242,0.7)' : 'rgba(255,255,255,0.3)',
              fontWeight: isCurrent ? 500 : 400,
              fontSize: '0.8rem',
              display: 'block',
              mb: bulletPoints ? 1 : 0,
            }}
          >
            {isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`}
          </Typography>
          {bulletPoints && bulletPoints.length > 0 && (
            <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
              {bulletPoints.slice(0, 2).map((point, i) => (
                <Typography
                  component="li"
                  key={i}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.84rem',
                    lineHeight: 1.6,
                    mb: 0.5,
                    '&::marker': { color: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </FadeInSection>
  );
};

const SimpleTimeline = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 }, maxWidth: 720, mx: 'auto' }}>
      <FadeInSection>
        <SectionHeading sectionName="Experience" />
      </FadeInSection>

      {sorted.map((exp, i) => (
        <TimelineEntry key={exp.title} {...exp} delay={0.1 + i * 0.08} />
      ))}
    </Box>
  );
};

export default SimpleTimeline;
