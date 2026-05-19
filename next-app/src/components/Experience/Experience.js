'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardSx = {
  background: 'rgba(255, 255, 255, 0.025)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease, background 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.12)',
    background: 'rgba(255, 255, 255, 0.035)',
  },
};

const SKILLS_DATA = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'Java', 'HTML5', 'CSS3'] },
  {
    category: 'AI & ML',
    items: ['LangChain', 'LangGraph', 'LangSmith', 'RAG Pipelines', 'Pinecone', 'TensorFlow'],
  },
  { category: 'Web', items: ['React', 'Next.js', 'Node.js', 'Express.js'] },
  { category: 'Data', items: ['Apache Spark', 'PySpark', 'Databricks', 'AWS Redshift'] },
  { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'Redis'] },
  { category: 'Testing', items: ['Pytest', 'RAGAS', 'DeepEval', 'Jest', 'JUnit'] },
];

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints }) => {
  const isCurrent = endDate === 'Present' || new Date(endDate) > new Date('2026-01-01');
  const isGraduation = title.startsWith('Graduated');

  return (
    <Box sx={{ ...cardSx, position: 'relative' }} className="exp-card">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
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
            background: '#fff',
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
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#fafafa', lineHeight: 1.3 }}>
              {isGraduation ? 'B.S. Computer Science, Summa Cum Laude' : title.split(',')[0]}
            </Typography>
            {isCurrent && !isGraduation && (
              <Chip
                label="Current"
                size="small"
                sx={{
                  height: 22,
                  bgcolor: 'rgba(52, 211, 153, 0.1)',
                  color: '#34d399',
                  border: '1px solid rgba(52, 211, 153, 0.2)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            rel="noopener"
            sx={{
              color: '#818cf8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'inline-block',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {company}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', mt: 0.25 }}>
            {location} · {isGraduation ? startDate : `${startDate} – ${isCurrent ? 'Present' : endDate}`}
          </Typography>
        </Box>
      </Box>

      {bulletPoints && bulletPoints.length > 0 && (
        <Box component="ul" sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {bulletPoints.slice(0, 3).map((point, i) => (
            <Box component="li" key={i} sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              {point}
            </Box>
          ))}
        </Box>
      )}
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
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [experienceData]);

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="Experience" />

      <Box
        ref={containerRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 2.5,
          mb: 6,
        }}
      >
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.title} {...exp} />
        ))}
      </Box>

      {/* Skills */}
      <Box sx={{ ...cardSx }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', mb: 3, display: 'block' }}>
          TECHNICAL SKILLS
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {SKILLS_DATA.map((group) => (
            <Box key={group.category}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#818cf8', mb: 1.5, letterSpacing: '0.02em' }}>
                {group.category}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {group.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      height: 26,
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      '& .MuiChip-label': { px: 1.2 },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;
