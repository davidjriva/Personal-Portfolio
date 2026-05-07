'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlassCard = ({ children, sx = {}, ...props }) => (
  <Box
    {...props}
    sx={{
      bgcolor: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      p: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        bgcolor: 'rgba(255, 255, 255, 0.035)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

const StatItem = ({ value, label }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: '#e8e8ed', lineHeight: 1.1 }}>{value}</Typography>
    <Typography sx={{ fontSize: '0.72rem', color: '#6b6b80', mt: 0.5, fontWeight: 500 }}>{label}</Typography>
  </Box>
);

const SocialLink = ({ href, icon, label }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      px: 2,
      py: 1,
      borderRadius: '10px',
      bgcolor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      color: '#8888a0',
      textDecoration: 'none',
      fontSize: '0.82rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: '#e8e8ed',
      },
    }}
  >
    {icon}
    {label}
  </Box>
);

const About = () => {
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then(setSkills);
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then(setAwards);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [skills, awards]);

  const allSkillItems = skills.flatMap((cat) => cat.items);

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="About" title="Get to know me" />

      <Box
        ref={gridRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gridTemplateRows: 'auto',
          gap: 2,
        }}
      >
        {/* Main bio card - spans 2 columns */}
        <GlassCard
          className="bento-card"
          sx={{
            gridColumn: { xs: '1', md: '1 / 3' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 3,
            p: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: 130,
              height: 130,
              borderRadius: '16px',
              overflow: 'hidden',
              flexShrink: 0,
              border: '2px solid rgba(96, 165, 250, 0.15)',
            }}
          >
            <Image
              alt="Photo of David Riva"
              src="/images/headshot.webp"
              width={130}
              height={130}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: '#e8e8ed', mb: 0.5 }}>
              David Riva
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Software Engineer &bull; Bay Area, CA
            </Typography>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              Software engineer with a strong background in full-stack development, applied AI, and data engineering.
              Colorado State University graduate (B.S. Computer Science, Summa Cum Laude). Passionate about building
              production-grade systems that solve real problems.
            </Typography>
            <Typography variant="body1">
              Experienced in building data-intensive applications, agentic AI pipelines, and developer tooling. I
              pride myself on clean architecture and delivering under tight deadlines.
            </Typography>
          </Box>
        </GlassCard>

        {/* Stats card */}
        <GlassCard className="bento-card" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="overline" sx={{ mb: 2.5, fontSize: '0.7rem' }}>
            At a glance
          </Typography>
          <Stack spacing={2.5}>
            <StatItem value="4.0" label="GPA — Summa Cum Laude" />
            <StatItem value="8,000+" label="Learners trained at C3 AI" />
            <StatItem value="1st" label="C3 AI Hackathon 2025" />
          </Stack>
        </GlassCard>

        {/* Skills card - spans 2 columns */}
        <GlassCard className="bento-card" sx={{ gridColumn: { xs: '1', md: '1 / 3' } }}>
          <Typography variant="overline" sx={{ mb: 2, display: 'block', fontSize: '0.7rem' }}>
            Technical Skills
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {allSkillItems.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(96, 165, 250, 0.06)',
                  color: '#8888a0',
                  border: '1px solid rgba(96, 165, 250, 0.1)',
                  fontSize: '0.72rem',
                  height: '28px',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'rgba(96, 165, 250, 0.12)',
                    color: '#60a5fa',
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </Stack>
        </GlassCard>

        {/* Awards card */}
        <GlassCard className="bento-card">
          <Typography variant="overline" sx={{ mb: 2, display: 'block', fontSize: '0.7rem' }}>
            Awards
          </Typography>
          <Stack spacing={2}>
            {awards.map((award) => (
              <Box key={award.title}>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#e8e8ed', lineHeight: 1.3, mb: 0.25 }}>
                  {award.title}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#6b6b80' }}>{award.date}</Typography>
              </Box>
            ))}
          </Stack>
        </GlassCard>

        {/* Social links */}
        <GlassCard
          className="bento-card"
          sx={{
            gridColumn: { xs: '1', md: '2 / 4' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Typography variant="overline" sx={{ fontSize: '0.7rem', mr: 2, whiteSpace: 'nowrap' }}>
            Connect
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ flex: 1 }}>
            <SocialLink
              href="https://github.com/davidjriva"
              icon={<GitHubIcon sx={{ fontSize: '1rem' }} />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/david-j-riva"
              icon={<LinkedInIcon sx={{ fontSize: '1rem' }} />}
              label="LinkedIn"
            />
            <SocialLink
              href="mailto:davidjriva@gmail.com"
              icon={<EmailIcon sx={{ fontSize: '1rem' }} />}
              label="davidjriva@gmail.com"
            />
          </Stack>
        </GlassCard>
      </Box>
    </Box>
  );
};

export default About;
