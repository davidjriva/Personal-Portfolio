'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints }) => {
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 3 },
        py: 4,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          mt: 0.5,
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#e8e6e3', lineHeight: 1.3 }}>
              {isGraduation ? title : title.split(',')[0].trim()}
            </Typography>
            <Typography
              component="a"
              href={companyWebsiteLink}
              target="_blank"
              rel="noopener"
              sx={{
                color: '#a78bfa',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {company}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'left', md: 'right' }, flexShrink: 0 }}>
            <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
              {isGraduation ? startDate : `${startDate} — ${endDate}`}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>{location}</Typography>
          </Box>
        </Box>

        {bulletPoints && bulletPoints.length > 0 && (
          <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5, listStyle: 'none' }}>
            {bulletPoints.map((point, i) => (
              <Box
                component="li"
                key={i}
                sx={{
                  position: 'relative',
                  pl: 1.5,
                  mb: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '0.55em',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'rgba(167,139,250,0.4)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                  {point}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperienceData(sorted);
      });
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '900px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="Experience" />

      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          px: { xs: 2.5, md: 4 },
          py: 1,
        }}
      >
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.title + exp.startDate} {...exp} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
