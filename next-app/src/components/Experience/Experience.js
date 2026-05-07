'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints }) => {
  const isCurrent = endDate === 'Present';
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box
      className="exp-card"
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
          pt: 0.5,
          flexShrink: 0,
          width: 40,
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: isCurrent ? '#60a5fa' : 'rgba(255, 255, 255, 0.1)',
            border: isCurrent ? '2px solid rgba(96, 165, 250, 0.3)' : '2px solid rgba(255, 255, 255, 0.06)',
            boxShadow: isCurrent ? '0 0 12px rgba(96, 165, 250, 0.3)' : 'none',
            flexShrink: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: '1px',
            flex: 1,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)',
            mt: 1,
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          p: { xs: 2.5, md: 3 },
          mb: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.035)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: bulletPoints ? 2 : 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              overflow: 'hidden',
              bgcolor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              p: 0.5,
            }}
          >
            <Image
              src={`/images/${logoImage}`}
              alt={`${company} logo`}
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#e8e8ed', lineHeight: 1.3 }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
              <Typography
                component="a"
                href={companyWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.82rem',
                  color: '#60a5fa',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {company}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#6b6b80' }}>&bull;</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#6b6b80' }}>{location}</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '0.72rem',
                color: isCurrent ? '#60a5fa' : '#6b6b80',
                fontWeight: isCurrent ? 500 : 400,
                mt: 0.5,
              }}
            >
              {isGraduation ? startDate : `${startDate} — ${endDate}`}
            </Typography>
          </Box>
        </Box>

        {bulletPoints && (
          <Stack spacing={1} sx={{ pl: { xs: 0, md: 6.5 } }}>
            {bulletPoints.map((point, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'rgba(96, 165, 250, 0.4)',
                    mt: '8px',
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: '0.82rem', color: '#8888a0', lineHeight: 1.6 }}>{point}</Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

const Experience = () => {
  const [data, setData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((d) => {
        const sorted = [...d].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setData(sorted);
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;
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
  }, [data]);

  return (
    <Box
      sx={{
        maxWidth: '900px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="Experience" title="Where I've worked" />
      <Box ref={containerRef}>
        {data.map((exp) => (
          <ExperienceCard key={exp.title} {...exp} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
