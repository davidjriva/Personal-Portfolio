'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate, bulletPoints }) => {
  const isCurrent = endDate === 'Present' || new Date(endDate) > new Date();
  const isGraduation = title.startsWith('Graduated');
  const shortTitle = isGraduation ? 'Graduated, Summa Cum Laude' : title.split(',')[0];
  const dateStr = isGraduation ? startDate : `${startDate} — ${endDate}`;

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.025)',
        border: isCurrent ? '1px solid rgba(0,212,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        p: { xs: 3, md: 3.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="a"
          href={companyWebsiteLink}
          target="_blank"
          rel="noopener"
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
            p: '4px',
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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#e8e8ed', lineHeight: 1.3 }}>
            {shortTitle}
          </Typography>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            rel="noopener"
            sx={{
              fontSize: '0.82rem',
              color: isCurrent ? '#00d4ff' : 'rgba(255,255,255,0.45)',
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
            fontSize: '0.72rem',
            color: isCurrent ? 'rgba(0,212,255,0.7)' : 'rgba(255,255,255,0.25)',
            whiteSpace: 'nowrap',
            fontWeight: isCurrent ? 500 : 400,
            flexShrink: 0,
          }}
        >
          {dateStr}
        </Typography>
      </Box>

      {bulletPoints && bulletPoints.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {bulletPoints.slice(0, 2).map((point, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.6,
                pl: 2,
                position: 'relative',
                '&::before': {
                  content: '"—"',
                  position: 'absolute',
                  left: 0,
                  color: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              {point}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

const Experience = () => {
  const [data, setData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((r) => r.json())
      .then((d) => setData([...d].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))));
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
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [data]);

  return (
    <Box>
      <SectionHeading sectionName="Experience" subtitle="Where I've worked" />

      <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map((exp) => (
          <Box key={exp.title} className="exp-card">
            <ExperienceCard {...exp} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
