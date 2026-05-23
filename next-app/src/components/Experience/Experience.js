'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setExperiences(sorted);
      });
  }, []);

  useEffect(() => {
    if (experiences.length === 0) return;
    const cards = sectionRef.current?.querySelectorAll('.exp-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }
  }, [experiences]);

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
        Experience
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
        Where I&apos;ve worked
      </Typography>

      <Box sx={{ position: 'relative', pl: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 7, md: 15 },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: 'rgba(255,255,255,0.06)',
          }}
        />

        {experiences.map((exp, index) => (
          <Box
            key={index}
            className="exp-card"
            sx={{
              position: 'relative',
              mb: 3,
              pl: { xs: 4, md: 5 },
              '&:last-child': { mb: 0 },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: { xs: -8.5, md: -7 },
                top: 28,
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: index === 0 ? 'primary.main' : '#27272a',
                border: '2px solid',
                borderColor: index === 0 ? 'primary.main' : 'rgba(255,255,255,0.12)',
                zIndex: 1,
              }}
            />

            <Box
              sx={{
                bgcolor: '#18181b',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                p: { xs: 3, md: 4 },
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.12)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                {exp.logoImage && (
                  <Box
                    component="a"
                    href={exp.companyWebsiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      src={`/images/${exp.logoImage}`}
                      alt={exp.company || exp.title}
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                )}
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.05rem', lineHeight: 1.3 }}>
                    {exp.title}
                  </Typography>
                  {exp.company && (
                    <Typography variant="body2" sx={{ color: 'primary.main', fontSize: '0.9rem' }}>
                      {exp.company}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1.5, alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                  }}
                >
                  {exp.startDate === exp.endDate ? exp.startDate : `${exp.startDate} — ${exp.endDate}`}
                </Typography>
                {exp.location && (
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                    }}
                  >
                    {exp.location}
                  </Typography>
                )}
              </Box>

              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                  {exp.bulletPoints.slice(0, 3).map((point, i) => (
                    <Typography
                      component="li"
                      key={i}
                      variant="body2"
                      sx={{ mb: 0.5, lineHeight: 1.6, fontSize: '0.875rem' }}
                    >
                      {point}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
