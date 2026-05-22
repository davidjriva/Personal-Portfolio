'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Grid, Chip, Stack } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardSx = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px',
  p: { xs: 2.5, md: 3 },
  height: '100%',
  transition: 'border-color 0.3s ease',
  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.1)' },
};

const StatCard = ({ value, label }) => (
  <Box sx={cardSx}>
    <Typography
      sx={{
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {value}
    </Typography>
    <Typography sx={{ fontSize: '0.8rem', color: '#52525b', mt: 0.5, fontWeight: 500, letterSpacing: '-0.01em' }}>
      {label}
    </Typography>
  </Box>
);

const ExperienceItem = ({ title, company, companyWebsiteLink, logoImage, startDate, endDate }) => {
  const isGraduation = title.startsWith('Graduated');
  const displayTitle = isGraduation ? 'Graduated Summa Cum Laude' : title;
  const dateRange = isGraduation ? startDate : `${startDate} – ${endDate}`;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        py: 1.5,
        '&:not(:last-child)': { borderBottom: '1px solid rgba(255, 255, 255, 0.04)' },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          overflow: 'hidden',
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Image
          src={`/images/${logoImage}`}
          alt={`${company} logo`}
          width={22}
          height={22}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#e4e4e7',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {displayTitle}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25, flexWrap: 'wrap' }}>
          <Typography
            component="a"
            href={companyWebsiteLink}
            target="_blank"
            rel="noopener"
            sx={{
              fontSize: '0.75rem',
              color: '#38c0f2',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {company}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#3f3f46' }}>·</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#52525b' }}>{dateRange}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const About = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => setExperienceData(data));
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data));
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [experienceData, skillsData]);

  const sortedExperience = [...experienceData].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  const allSkills = skillsData.flatMap((cat) => cat.items);

  return (
    <Box
      ref={sectionRef}
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Section label */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#38c0f2',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mb: 4,
        }}
      >
        About
      </Typography>

      <Grid container spacing={2}>
        {/* Profile card */}
        <Grid size={{ xs: 12, md: 5 }} className="bento-card">
          <Box sx={{ ...cardSx, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid rgba(56, 192, 242, 0.15)',
                }}
              >
                <Image
                  alt="David Riva"
                  src="/images/headshot.webp"
                  width={72}
                  height={72}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  David Riva
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#38c0f2', fontWeight: 500, mt: 0.25 }}>
                  Software Engineer
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#52525b', mt: 0.25 }}>Bay Area, CA</Typography>
              </Box>
            </Box>

            <Typography sx={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.7, letterSpacing: '-0.01em' }}>
              Software engineer with a B.S. in Computer Science from Colorado State University (Summa Cum Laude).
              Passionate about applied AI, full-stack development, and building production-grade ML systems.
            </Typography>

            {/* Social links */}
            <Stack direction="row" spacing={1}>
              <Box
                component="a"
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#a1a1aa',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: 'rgba(56, 192, 242, 0.3)', color: '#38c0f2' },
                }}
              >
                <DescriptionOutlinedIcon sx={{ fontSize: '0.95rem' }} />
                Resume
              </Box>
              <Box
                component="a"
                href="https://github.com/davidjriva"
                target="_blank"
                rel="noopener"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#a1a1aa',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.15)', color: '#fafafa' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.1rem' }} />
              </Box>
              <Box
                component="a"
                href="https://www.linkedin.com/in/david-j-riva"
                target="_blank"
                rel="noopener"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#a1a1aa',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: 'rgba(56, 192, 242, 0.3)', color: '#38c0f2' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Stats + Skills column */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={2}>
            {/* Stats row */}
            <Grid size={{ xs: 4 }} className="bento-card">
              <StatCard value="2+" label="Years Experience" />
            </Grid>
            <Grid size={{ xs: 4 }} className="bento-card">
              <StatCard value="11" label="Projects Built" />
            </Grid>
            <Grid size={{ xs: 4 }} className="bento-card">
              <StatCard value="4.0" label="GPA, Summa Cum Laude" />
            </Grid>

            {/* Skills card */}
            <Grid size={12} className="bento-card">
              <Box sx={cardSx}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#52525b',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 1.5,
                  }}
                >
                  Skills & Technologies
                </Typography>
                <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75}>
                  {allSkills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        color: '#a1a1aa',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '0.75rem',
                        height: '26px',
                        fontWeight: 500,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'rgba(56, 192, 242, 0.06)',
                          borderColor: 'rgba(56, 192, 242, 0.15)',
                          color: '#38c0f2',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Experience section */}
        <Grid size={12} className="bento-card">
          <Box sx={cardSx}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#52525b',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              Experience
            </Typography>
            {sortedExperience.map((exp) => (
              <ExperienceItem key={exp.title} {...exp} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
