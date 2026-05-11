'use client';

import { Box, Typography, Chip, Stack, Link } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardSx = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '20px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255,255,255,0.12)',
  },
};

const labelSx = {
  fontSize: '0.72rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.3)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  mb: 0.5,
};

const BioCard = () => (
  <Box sx={{ ...cardSx, gridColumn: { xs: '1 / -1', md: 'span 7' } }}>
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box
        sx={{
          width: { xs: 90, sm: 110 },
          height: { xs: 90, sm: 110 },
          borderRadius: '18px',
          overflow: 'hidden',
          flexShrink: 0,
          border: '2px solid rgba(255,255,255,0.08)',
        }}
      >
        <Image
          alt="David Riva"
          src="/images/headshot.webp"
          width={110}
          height={110}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          priority
        />
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, mb: 0.5, color: '#f5f5f7' }}>
          David Riva
        </Typography>
        <Typography sx={{ color: '#8b5cf6', fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
          Training Engineer, Generative AI
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Bay Area, CA</Typography>
      </Box>
    </Box>

    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1.5, fontSize: '0.95rem' }}>
      Software engineer passionate about applied AI and full-stack development. Graduate of Colorado State University
      (B.S. Computer Science, Summa Cum Laude) with experience building production ML systems, data pipelines, and
      modern web applications.
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, fontSize: '0.95rem' }}>
      Strong background in data structures, algorithms, and mathematical applications. Dedicated to elegant
      problem-solving and maintaining high standards of excellence.
    </Typography>

    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
      <Box
        component="a"
        href="/documents/resume.pdf"
        target="_blank"
        rel="noopener"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2.5,
          py: 1,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.85rem',
          fontFamily: 'var(--font-inter), var(--font-montserrat), sans-serif',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.85 },
        }}
      >
        <DescriptionIcon sx={{ fontSize: '1rem' }} />
        Resume
      </Box>
      <Link
        href="https://github.com/davidjriva"
        target="_blank"
        rel="noopener"
        sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#f5f5f7' }, transition: 'color 0.2s', display: 'flex' }}
      >
        <GitHubIcon sx={{ fontSize: 26 }} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/david-j-riva"
        target="_blank"
        rel="noopener"
        sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#f5f5f7' }, transition: 'color 0.2s', display: 'flex' }}
      >
        <LinkedInIcon sx={{ fontSize: 26 }} />
      </Link>
    </Box>
  </Box>
);

const StatsCard = () => (
  <Box
    sx={{
      ...cardSx,
      gridColumn: { xs: '1 / -1', md: 'span 5' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 3,
    }}
  >
    {[
      { label: 'Current Role', value: 'Training Engineer, Gen AI @ C3 AI' },
      { label: 'Education', value: 'B.S. Computer Science, Summa Cum Laude' },
      { label: 'Focus Areas', value: 'Applied AI · Full-Stack · Production ML' },
      { label: 'Email', value: 'davidjriva@gmail.com', href: 'mailto:davidjriva@gmail.com' },
    ].map(({ label, value, href }) => (
      <Box key={label}>
        <Typography sx={labelSx}>{label}</Typography>
        {href ? (
          <Typography
            component="a"
            href={href}
            sx={{
              fontSize: '0.95rem',
              color: '#8b5cf6',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {value}
          </Typography>
        ) : (
          <Typography sx={{ fontSize: '0.95rem', color: '#f5f5f7', fontWeight: 500 }}>{value}</Typography>
        )}
      </Box>
    ))}
  </Box>
);

const SkillsCard = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch('/data/skills.json')
      .then((r) => r.json())
      .then(setSkills);
  }, []);

  return (
    <Box sx={{ ...cardSx, gridColumn: '1 / -1' }}>
      <Typography sx={{ ...labelSx, mb: 3 }}>Skills &amp; Technologies</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {skills.map((category) => (
          <Box key={category.title}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', mb: 1 }}>
              {category.title}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {category.items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(139,92,246,0.07)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(139,92,246,0.12)',
                    fontSize: '0.78rem',
                    height: 28,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.3)' },
                  }}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const ExperienceCard = () => {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    fetch('/data/experiences.json')
      .then((r) => r.json())
      .then((data) => {
        setExperiences([...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
      });
  }, []);

  return (
    <Box sx={{ ...cardSx, gridColumn: { xs: '1 / -1', md: 'span 7' } }}>
      <Typography sx={{ ...labelSx, mb: 3 }}>Experience</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {experiences.map((exp, i) => {
          const isCurrent = exp.endDate === 'Present' || new Date(exp.endDate) > new Date();
          const isGrad = exp.title.startsWith('Graduated');
          return (
            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: '#fff',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  border: isCurrent ? '1.5px solid rgba(139,92,246,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
                  boxShadow: isCurrent ? '0 0 12px rgba(139,92,246,0.15)' : 'none',
                }}
              >
                <Image
                  src={`/images/${exp.logoImage}`}
                  alt={exp.company}
                  width={22}
                  height={22}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#f5f5f7', lineHeight: 1.3 }}>
                  {isGrad ? 'Graduated' : exp.title.split(',')[0]}
                </Typography>
                <Typography
                  component="a"
                  href={exp.companyWebsiteLink}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontSize: '0.8rem',
                    color: '#8b5cf6',
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {exp.company}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', mt: 0.25 }}>
                  {isGrad ? exp.startDate : `${exp.startDate} – ${exp.endDate}`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const AwardsCard = () => {
  const [awards, setAwards] = useState([]);
  useEffect(() => {
    fetch('/data/awards.json')
      .then((r) => r.json())
      .then(setAwards);
  }, []);

  return (
    <Box sx={{ ...cardSx, gridColumn: { xs: '1 / -1', md: 'span 5' } }}>
      <Typography sx={{ ...labelSx, mb: 3 }}>Awards</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {awards.map((award, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <EmojiEventsIcon sx={{ color: '#f59e0b', fontSize: '1.2rem', mt: 0.25, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#f5f5f7', lineHeight: 1.35 }}>
                {award.title}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', mt: 0.25, lineHeight: 1.5 }}>
                {award.description}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', mt: 0.5 }}>{award.date}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const About = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <Box
        ref={gridRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: 2,
        }}
      >
        <BioCard />
        <StatsCard />
        <SkillsCard />
        <ExperienceCard />
        <AwardsCard />
      </Box>
    </Box>
  );
};

export default About;
