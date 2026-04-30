'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Collapse, IconButton } from '@mui/material';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionHeading from '@/components/SectionHeading';
import FadeIn from '@/components/FadeIn';

const ExperienceCard = ({ experience, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = experience.endDate === 'Present' || experience.endDate === 'April 2026';
  const isGraduation = experience.title.startsWith('Graduated');

  return (
    <FadeIn delay={index * 0.08}>
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
            width: 40,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: isCurrent ? '1px solid rgba(56,189,248,0.25)' : '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src={`/images/${experience.logoImage}`}
              alt={`${experience.company} logo`}
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box
            sx={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
              mt: 1,
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ pb: 5, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#fafafa', lineHeight: 1.3 }}>
                {isGraduation ? 'B.S. Computer Science — Summa Cum Laude' : experience.title}
              </Typography>
              <Typography
                component="a"
                href={experience.companyWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.82rem',
                  color: '#38bdf8',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {experience.company}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#52525b', mt: 0.5 }}>
                {experience.startDate} — {experience.endDate}
                {experience.location && ` · ${experience.location}`}
              </Typography>
            </Box>

            {experience.bulletPoints && experience.bulletPoints.length > 0 && (
              <IconButton
                size="small"
                onClick={() => setExpanded(!expanded)}
                sx={{
                  color: '#52525b',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease',
                  '&:hover': { color: '#a1a1aa' },
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Collapse in={expanded} timeout={300}>
            {experience.bulletPoints && (
              <Box component="ul" sx={{ mt: 1.5, pl: 2, mb: 0 }}>
                {experience.bulletPoints.map((point, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{
                      color: '#a1a1aa',
                      fontSize: '0.82rem',
                      lineHeight: 1.6,
                      mb: 0.75,
                      '&::marker': { color: '#3f3f46' },
                    }}
                  >
                    {point}
                  </Box>
                ))}
              </Box>
            )}
          </Collapse>
        </Box>
      </Box>
    </FadeIn>
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
    <Box sx={{ maxWidth: '700px', mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading sectionName="Experience" subtitle="Where I've worked" />

      <Box>
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.title} experience={exp} index={i} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
