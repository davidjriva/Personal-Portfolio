'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints }) => {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = endDate === 'Present' || (new Date(endDate) > new Date('2026-01-01'));
  const isGraduation = title.startsWith('Graduated');
  const hasBullets = bulletPoints && bulletPoints.length > 0;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        gap: { xs: 2, md: 3 },
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
            bgcolor: 'rgba(255,255,255,0.04)',
            border: isCurrent ? '1.5px solid rgba(56,192,242,0.3)' : '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: isCurrent ? '0 0 16px rgba(56,192,242,0.1)' : 'none',
          }}
        >
          <Image
            src={`/images/${logoImage}`}
            alt={`${company} logo`}
            width={22}
            height={22}
            style={{ display: 'block', objectFit: 'contain' }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
            mt: 1,
          }}
        />
      </Box>

      {/* Content */}
      <Box
        onClick={() => hasBullets && setExpanded(!expanded)}
        sx={{
          flex: 1,
          pb: 5,
          cursor: hasBullets ? 'pointer' : 'default',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          p: { xs: 2.5, md: 3 },
          mb: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: hasBullets ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            background: hasBullets ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.025)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', md: '1.05rem' }, mb: 0.5, lineHeight: 1.3 }}>
              {isGraduation ? 'Graduated — Summa Cum Laude' : title.split(',')[0]}
            </Typography>
            <Typography
              component="a"
              href={companyWebsiteLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: '#38c0f2',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {company}
            </Typography>
          </Box>
          {hasBullets && (
            <ExpandMoreIcon
              sx={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '1.2rem',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
                mt: 0.5,
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
            {isGraduation ? startDate : `${startDate} — ${endDate}`}
          </Typography>
          {location && (
            <>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.15)' }} />
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                {location}
              </Typography>
            </>
          )}
          {isCurrent && (
            <Box
              sx={{
                px: 1.25,
                py: 0.25,
                borderRadius: '6px',
                bgcolor: 'rgba(56,192,242,0.08)',
                border: '1px solid rgba(56,192,242,0.15)',
              }}
            >
              <Typography sx={{ fontSize: '0.68rem', color: '#38c0f2', fontWeight: 600, letterSpacing: '0.04em' }}>
                Current
              </Typography>
            </Box>
          )}
        </Box>

        <Collapse in={expanded} timeout={250}>
          <Box component="ul" sx={{ mt: 2, pl: 2, mb: 0, listStyle: 'none' }}>
            {bulletPoints?.map((point, idx) => (
              <Box
                component="li"
                key={idx}
                sx={{
                  position: 'relative',
                  pl: 2,
                  mb: 1.5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '0.6em',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'rgba(56,192,242,0.4)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
                  {point}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperienceData(sorted);
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current || experienceData.length === 0) return;
    const cards = containerRef.current.querySelectorAll('.exp-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [experienceData]);

  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 10, md: 15 },
      }}
    >
      <SectionHeading sectionName="Experience" subtitle="Where I've worked" />

      <Box ref={containerRef}>
        {experienceData.map((exp) => (
          <Box key={exp.title} className="exp-card">
            <ExperienceCard {...exp} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
