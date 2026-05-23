'use client';

import { Box, Typography, Chip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const [skillGroups, setSkillGroups] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then(setSkillGroups);
  }, []);

  useEffect(() => {
    if (skillGroups.length === 0) return;
    const groups = sectionRef.current?.querySelectorAll('.skill-group');
    if (groups) {
      gsap.fromTo(
        groups,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }
  }, [skillGroups]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 2, sm: 4, md: 6, lg: 12 },
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'primary.main',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        Skills
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
        Technologies I use
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        {skillGroups.map((group) => (
          <Box
            key={group.title}
            className="skill-group"
            sx={{
              bgcolor: '#18181b',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              p: 3,
              transition: 'border-color 0.3s ease',
              '&:hover': { borderColor: 'rgba(255,255,255,0.12)' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'primary.main',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              {group.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {group.items.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    height: 28,
                    fontSize: '0.8rem',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: 'text.secondary',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(56, 189, 248, 0.08)',
                      color: 'primary.main',
                      borderColor: 'rgba(56, 189, 248, 0.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
