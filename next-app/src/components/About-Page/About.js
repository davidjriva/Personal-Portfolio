'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Chip, Stack, Grid, IconButton, Link, Button } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const glassCard = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '20px',
  p: { xs: 3, md: 3.5 },
  height: '100%',
  transition: 'border-color 0.3s ease, background 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.03)',
  },
};

const cardLabel = {
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(240,240,245,0.35)',
  mb: 2.5,
};

const BioCard = () => (
  <Box sx={glassCard}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { sm: 'flex-start' } }}>
      <Box
        sx={{
          p: '2px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #38c0f2, #8b5cf6)',
          flexShrink: 0,
          alignSelf: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <Box sx={{ borderRadius: '14px', overflow: 'hidden', bgcolor: '#0a0a14', width: 110, height: 110 }}>
          <Image
            alt="Photo of David Riva"
            src="/images/headshot.webp"
            width={110}
            height={110}
            style={{ objectFit: 'cover', display: 'block' }}
            priority
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.65rem', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#f0f0f5' }}>
          David Riva
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '0.9rem', color: '#38c0f2', mt: 0.5, mb: 0.75 }}>
          Training Engineer, Generative AI
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'rgba(240,240,245,0.4)' }}>
          Bay Area, CA
        </Typography>
      </Box>
    </Box>

    <Typography variant="body1" sx={{ mt: 3, color: 'rgba(240,240,245,0.65)', lineHeight: 1.75 }}>
      Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
      University with a B.S. in Computer Science, Summa Cum Laude. I&apos;m passionate about software &amp; applied AI
      engineering, with experience in full-stack development, data engineering, and big data visualization.
    </Typography>

    <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
        <IconButton
          aria-label="GitHub Profile"
          size="small"
          sx={{
            color: 'rgba(240,240,245,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            width: 38,
            height: 38,
            transition: 'all 0.2s ease',
            '&:hover': { color: '#f0f0f5', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)' },
          }}
        >
          <GitHubIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
        <IconButton
          aria-label="LinkedIn Profile"
          size="small"
          sx={{
            color: 'rgba(240,240,245,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            width: 38,
            height: 38,
            transition: 'all 0.2s ease',
            '&:hover': { color: '#38c0f2', borderColor: 'rgba(56,192,242,0.3)', background: 'rgba(56,192,242,0.06)' },
          }}
        >
          <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Link>
      <Link href="mailto:davidjriva@gmail.com">
        <IconButton
          aria-label="Email"
          size="small"
          sx={{
            color: 'rgba(240,240,245,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            width: 38,
            height: 38,
            transition: 'all 0.2s ease',
            '&:hover': { color: '#f0f0f5', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)' },
          }}
        >
          <EmailOutlinedIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Link>
      <Button
        href="/documents/resume.pdf"
        target="_blank"
        startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '0.95rem !important' }} />}
        sx={{
          ml: 0.5,
          color: 'rgba(240,240,245,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          textTransform: 'none',
          fontSize: '0.78rem',
          fontWeight: 500,
          px: 1.75,
          py: 0.6,
          transition: 'all 0.2s ease',
          '&:hover': { color: '#f0f0f5', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)' },
        }}
      >
        Resume
      </Button>
    </Stack>
  </Box>
);

const skillCategoryColors = {
  Languages: { bg: 'rgba(56,192,242,0.08)', border: 'rgba(56,192,242,0.2)', color: '#5ed0f7' },
  'AI Orchestration & Machine Learning': { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', color: '#a78bfa' },
  'Web Development': { bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', color: '#6ee7b7' },
  'Big Data & Cloud': { bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)', color: '#fdba74' },
  'Databases & Tools': { bg: 'rgba(240,240,245,0.05)', border: 'rgba(240,240,245,0.12)', color: 'rgba(240,240,245,0.65)' },
  'Testing & Validation': { bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)', color: '#f9a8d4' },
  'Data Science Libraries': { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', color: '#93c5fd' },
};

const SkillsCard = ({ skills }) => (
  <Box sx={glassCard}>
    <Typography sx={cardLabel}>Skills & Tools</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {skills.map((category) => {
        const colors = skillCategoryColors[category.title] || skillCategoryColors['Databases & Tools'];
        return (
          <Box key={category.title}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: colors.color, mb: 0.75, opacity: 0.8 }}>
              {category.title}
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {category.items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{
                    bgcolor: colors.bg,
                    color: colors.color,
                    border: `1px solid ${colors.border}`,
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    height: '24px',
                    borderRadius: '6px',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              ))}
            </Stack>
          </Box>
        );
      })}
    </Box>
  </Box>
);

const ExperienceCard = ({ experiences }) => {
  const sorted = [...experiences]
    .filter((e) => !e.title.startsWith('Graduated'))
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={glassCard}>
      <Typography sx={cardLabel}>Experience</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sorted.map((exp, i) => {
          const isCurrent = exp.endDate === 'Present' || new Date(exp.endDate) > new Date('2026-01-01');
          return (
            <Box
              key={exp.title}
              sx={{
                display: 'flex',
                gap: 2,
                py: 1.75,
                borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  bgcolor: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.25,
                  border: isCurrent ? '1px solid rgba(56,192,242,0.2)' : '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <Image
                  src={`/images/${exp.logoImage}`}
                  alt={`${exp.company} logo`}
                  width={20}
                  height={20}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#f0f0f5', lineHeight: 1.3 }}>
                  {exp.title.split(',')[0]}
                </Typography>
                <Typography
                  component="a"
                  href={exp.companyWebsiteLink}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontSize: '0.75rem',
                    color: '#38c0f2',
                    textDecoration: 'none',
                    display: 'block',
                    mt: 0.25,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {exp.company}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: 'rgba(240,240,245,0.35)', mt: 0.5 }}>
                  {exp.startDate} &ndash; {isCurrent ? 'Present' : exp.endDate}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const awardIcons = {
  '1st Place': <EmojiEventsIcon sx={{ fontSize: '1rem', color: '#fbbf24' }} />,
  Summa: <SchoolIcon sx={{ fontSize: '1rem', color: '#a78bfa' }} />,
  Excellence: <WorkspacePremiumIcon sx={{ fontSize: '1rem', color: '#38c0f2' }} />,
  "Dean's": <SchoolIcon sx={{ fontSize: '1rem', color: '#6ee7b7' }} />,
};

const getAwardIcon = (title) => {
  for (const [key, icon] of Object.entries(awardIcons)) {
    if (title.includes(key)) return icon;
  }
  return <EmojiEventsIcon sx={{ fontSize: '1rem', color: '#fbbf24' }} />;
};

const AwardsCard = ({ awards }) => (
  <Box sx={glassCard}>
    <Typography sx={cardLabel}>Awards</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {awards.map((award, i) => (
        <Box
          key={award.title}
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            borderBottom: i < awards.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            {getAwardIcon(award.title)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#f0f0f5', lineHeight: 1.35 }}>
              {award.title}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(240,240,245,0.4)', mt: 0.25 }}>
              {award.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const About = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [awards, setAwards] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/skills.json').then((r) => r.json()),
      fetch('/data/experiences.json').then((r) => r.json()),
      fetch('/data/awards.json').then((r) => r.json()),
    ]).then(([s, e, a]) => {
      setSkills(s);
      setExperiences(e);
      setAwards(a);
    });
  }, []);

  useEffect(() => {
    if (!gridRef.current || !skills.length) return;
    const cards = gridRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [skills]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Grid ref={gridRef} container spacing={2.5}>
        <Grid size={{ xs: 12, md: 7 }} className="bento-card">
          <BioCard />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} className="bento-card">
          {skills.length > 0 && <SkillsCard skills={skills} />}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }} className="bento-card">
          {experiences.length > 0 && <ExperienceCard experiences={experiences} />}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 7 }} className="bento-card">
          {awards.length > 0 && <AwardsCard awards={awards} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
