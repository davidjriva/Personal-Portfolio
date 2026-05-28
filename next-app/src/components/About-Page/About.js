'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Chip, Stack, IconButton, Link, Button } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useInView } from 'react-intersection-observer';

const cardSx = {
  background: 'rgba(255, 255, 255, 0.025)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '20px',
  p: { xs: 3, md: 3.5 },
  height: '100%',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
};

const fadeInProps = (inView, delay = 0) => ({
  sx: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  },
});

const ProfileCard = ({ inView }) => (
  <Box
    sx={{
      ...cardSx,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 2,
      ...fadeInProps(inView, 0).sx,
    }}
  >
    <Box
      sx={{
        p: '2px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #38c0f2, #a78bfa)',
        flexShrink: 0,
      }}
    >
      <Box sx={{ borderRadius: '50%', overflow: 'hidden', bgcolor: '#050507', width: 140, height: 140 }}>
        <Image
          alt="Photo of David Riva"
          src="/images/headshot.webp"
          width={140}
          height={140}
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>
    </Box>

    <Box>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
        David Riva
      </Typography>
      <Typography sx={{ color: '#38c0f2', fontWeight: 500, fontSize: '0.9rem', mb: 0.5 }}>
        Training Engineer, Generative AI
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Bay Area, CA</Typography>
    </Box>

    <Stack direction="row" spacing={1} alignItems="center">
      <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
        <IconButton
          aria-label="GitHub Profile"
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.15)' },
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
            color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.15)' },
          }}
        >
          <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
        </IconButton>
      </Link>
      <Link href="mailto:davidjriva@gmail.com" target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', '&:hover': { color: '#38c0f2' } }}>
          davidjriva@gmail.com
        </Typography>
      </Link>
    </Stack>

    <Button
      variant="outlined"
      onClick={() => window.open('/documents/resume.pdf', '_blank')}
      endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
      sx={{
        color: 'rgba(255,255,255,0.6)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        textTransform: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        px: 2.5,
        py: 0.6,
        mt: 'auto',
        '&:hover': {
          borderColor: '#38c0f2',
          color: '#38c0f2',
          bgcolor: 'rgba(56,192,242,0.06)',
        },
      }}
    >
      Resume
    </Button>
  </Box>
);

const BioCard = ({ inView }) => (
  <Box sx={{ ...cardSx, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...fadeInProps(inView, 0.1).sx }}>
    <Typography variant="overline" sx={{ color: '#38c0f2', mb: 2, fontSize: '0.65rem' }}>
      About
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, lineHeight: 1.8 }}>
      Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
      University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m incredibly
      passionate about software &amp; applied AI engineering.
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, lineHeight: 1.8 }}>
      I&apos;m experienced in full-stack development, data engineering, and big data visualization.
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
      I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on elegant
      problem-solving and my dedication to maintaining high standards of excellence.
    </Typography>
  </Box>
);

const ExperienceCard = ({ experiences, inView }) => {
  const sorted = [...experiences].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={{ ...cardSx, ...fadeInProps(inView, 0.2).sx }}>
      <Typography variant="overline" sx={{ color: '#38c0f2', mb: 2.5, display: 'block', fontSize: '0.65rem' }}>
        Experience
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sorted.map((exp, i) => {
          const isCurrent = exp.endDate === 'Present' || exp.endDate === 'April 2026';
          const isGraduation = exp.title.startsWith('Graduated');
          return (
            <Box
              key={exp.title}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                pb: i < sorted.length - 1 ? 2 : 0,
                borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  bgcolor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: isCurrent ? '1.5px solid rgba(56,192,242,0.4)' : '1.5px solid rgba(255,255,255,0.1)',
                }}
              >
                <Image
                  src={`/images/${exp.logoImage}`}
                  alt={`${exp.company} logo`}
                  width={18}
                  height={18}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#fafafa', lineHeight: 1.3, mb: 0.25 }}>
                  {isGraduation ? 'Graduated' : exp.title.split(',')[0]}
                </Typography>
                <Typography
                  component="a"
                  href={exp.companyWebsiteLink}
                  target="_blank"
                  sx={{
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    fontSize: '0.72rem',
                    '&:hover': { color: '#38c0f2' },
                  }}
                >
                  {exp.company}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: isCurrent ? '#38c0f2' : 'rgba(255,255,255,0.3)',
                  fontWeight: isCurrent ? 600 : 400,
                  fontSize: '0.65rem',
                  flexShrink: 0,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                {isGraduation ? exp.startDate : `${exp.startDate.split(' ')[0].slice(0, 3)} '${exp.startDate.split(' ')[1]?.slice(2)}`}
                {!isGraduation && ' – '}
                {!isGraduation &&
                  (isCurrent
                    ? 'Present'
                    : `${exp.endDate.split(' ')[0].slice(0, 3)} '${exp.endDate.split(' ')[1]?.slice(2)}`)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const SkillsCard = ({ skills, inView }) => (
  <Box sx={{ ...cardSx, ...fadeInProps(inView, 0.25).sx }}>
    <Typography variant="overline" sx={{ color: '#38c0f2', mb: 2, display: 'block', fontSize: '0.65rem' }}>
      Skills
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {skills.map((group) => (
        <Box key={group.title}>
          <Typography
            sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', mb: 1, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            {group.title}
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {group.items.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.7rem',
                  height: '24px',
                  borderRadius: '6px',
                  '& .MuiChip-label': { px: 1 },
                  '&:hover': { bgcolor: 'rgba(56,192,242,0.08)', borderColor: 'rgba(56,192,242,0.2)', color: '#38c0f2' },
                }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  </Box>
);

const AwardsCard = ({ awards, inView }) => (
  <Box sx={{ ...cardSx, ...fadeInProps(inView, 0.3).sx }}>
    <Typography variant="overline" sx={{ color: '#38c0f2', mb: 2, display: 'block', fontSize: '0.65rem' }}>
      Awards &amp; Honors
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {awards.map((award, i) => (
        <Box
          key={award.title}
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'flex-start',
            pb: i < awards.length - 1 ? 2 : 0,
            borderBottom: i < awards.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <EmojiEventsIcon sx={{ color: '#facc15', fontSize: '1.1rem', mt: 0.25, flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#fafafa', lineHeight: 1.3, mb: 0.25 }}>
              {award.title}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
              {award.description}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)', mt: 0.5, display: 'block' }}>
              {award.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const About = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => setExperiences(data));
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkills(data));
    fetch('/data/awards.json')
      .then((res) => res.json())
      .then((data) => setAwards(data));
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 8, md: 10 },
      }}
    >
      <Grid container spacing={2}>
        {/* Row 1: Profile + Bio */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileCard inView={inView} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <BioCard inView={inView} />
        </Grid>

        {/* Row 2: Experience + Awards */}
        <Grid size={{ xs: 12, md: 7 }}>
          <ExperienceCard experiences={experiences} inView={inView} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <AwardsCard awards={awards} inView={inView} />
        </Grid>

        {/* Row 3: Skills (full width) */}
        <Grid size={{ xs: 12 }}>
          <SkillsCard skills={skills} inView={inView} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
