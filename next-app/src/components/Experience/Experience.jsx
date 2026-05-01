'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import SectionWrapper from '@/components/shared/SectionWrapper';
import FadeInView from '@/components/shared/FadeInView';

const ExperienceCard = ({ experience, index }) => {
  const isCurrent = experience.endDate === 'Present' || new Date(experience.endDate) > new Date();
  const isGraduation = experience.title.startsWith('Graduated');

  return (
    <FadeInView delay={index * 0.08}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 3 },
          position: 'relative',
        }}
      >
        {/* Timeline line */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            pt: '6px',
            flexShrink: 0,
            width: 40,
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: isCurrent ? '#a78bfa' : 'rgba(255,255,255,0.15)',
              boxShadow: isCurrent ? '0 0 12px rgba(167,139,250,0.4)' : 'none',
              flexShrink: 0,
            }}
          />
          <Box
            sx={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
              mt: 0.5,
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            p: { xs: 2.5, md: 3 },
            mb: 2,
            transition: 'border-color 0.3s ease',
            '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Image
                src={`/images/${experience.logoImage}`}
                alt={`${experience.company} logo`}
                width={22}
                height={22}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#fafafa', lineHeight: 1.3 }}>
                {isGraduation ? 'B.S. Computer Science, Summa Cum Laude' : experience.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                <Typography
                  component="a"
                  href={experience.companyWebsiteLink}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: '#a78bfa',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {experience.company}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                  {experience.location}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: isCurrent ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                  fontSize: '0.75rem',
                  fontWeight: isCurrent ? 500 : 400,
                  mt: 0.5,
                }}
              >
                {isGraduation ? experience.startDate : `${experience.startDate} – ${experience.endDate}`}
              </Typography>
            </Box>
          </Box>

          {experience.bulletPoints && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              {experience.bulletPoints.slice(0, 3).map((point, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      mt: '8px',
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    {point}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </FadeInView>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperiences(sorted);
      })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper
      label="Experience"
      title="Where I've worked"
      subtitle="From AI engineering to full-stack development and machine learning."
      maxWidth="800px"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Box>
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.title} experience={exp} index={i} />
        ))}
      </Box>
    </SectionWrapper>
  );
};

export default Experience;
