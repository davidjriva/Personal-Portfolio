'use client';

import { Box, Typography, Chip } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS = {
  Languages: '#00d4ff',
  'AI Orchestration & Machine Learning': '#a78bfa',
  'Web Development': '#34d399',
  'Big Data & Cloud': '#fb923c',
  'Databases & Tools': '#f472b6',
  'Testing & Validation': '#fbbf24',
  'Data Science Libraries': '#60a5fa',
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((r) => r.json())
      .then(setSkills);
  }, []);

  useEffect(() => {
    if (!containerRef.current || skills.length === 0) return;
    const groups = containerRef.current.querySelectorAll('.skill-group');
    gsap.fromTo(
      groups,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [skills]);

  return (
    <Box>
      <SectionHeading sectionName="Skills" subtitle="Technologies I use" />

      <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {skills.map((category) => {
          const accent = CATEGORY_COLORS[category.title] || '#00d4ff';
          return (
            <Box key={category.title} className="skill-group">
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  opacity: 0.8,
                }}
              >
                {category.title}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {category.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.03)',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 400,
                      height: '30px',
                      transition: 'all 0.2s ease',
                      '& .MuiChip-label': { px: 1.5 },
                      '&:hover': {
                        bgcolor: `${accent}12`,
                        borderColor: `${accent}30`,
                        color: accent,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Skills;
