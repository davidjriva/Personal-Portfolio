'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceItem = ({ title, company, companyWebsiteLink, startDate, endDate, logoImage }) => {
  const isCurrent = endDate === 'Present' || new Date(endDate) > new Date('2026-01-01');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        py: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '8px',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <Image
          src={`/images/${logoImage}`}
          alt={`${company} logo`}
          width={20}
          height={20}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0ede8', lineHeight: 1.3 }}>
          {title.split(',')[0]}
        </Typography>
        <Typography
          component="a"
          href={companyWebsiteLink}
          target="_blank"
          rel="noopener"
          sx={{
            fontSize: '0.75rem',
            color: 'rgba(240, 237, 232, 0.4)',
            textDecoration: 'none',
            '&:hover': { color: '#e8a838' },
          }}
        >
          {company}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '0.7rem',
          color: isCurrent ? '#e8a838' : 'rgba(240, 237, 232, 0.3)',
          fontWeight: isCurrent ? 500 : 400,
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}
      >
        {startDate.split(' ')[1] || startDate} — {isCurrent ? 'Now' : (endDate.split(' ')[1] || endDate)}
      </Typography>
    </Box>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((data) => setExperienceData(data));
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.about-animate');
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [experienceData]);

  const sortedExperiences = [...experienceData]
    .filter((e) => !e.title.startsWith('Graduated'))
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box
      ref={sectionRef}
      sx={{
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <Box className="about-animate">
        <SectionHeading sectionName="About" subtitle="Software engineer with a passion for building intelligent systems." />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
        }}
      >
        {/* Bio Card */}
        <Box
          className="about-animate"
          sx={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            p: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/headshot.webp"
                alt="David Riva"
                width={64}
                height={64}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0ede8' }}>
                David Riva
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(240, 237, 232, 0.4)' }}>
                Bay Area, CA
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.7 }}>
            Software engineer specializing in applied AI, full-stack development, and data engineering.
            I build production-grade systems — from RAG pipelines to training platforms serving thousands of learners.
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.7 }}>
            B.S. Computer Science from Colorado State University, Summa Cum Laude. Passionate about elegant
            problem-solving and maintaining high standards of engineering excellence.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Box
              component="a"
              href="https://github.com/davidjriva"
              target="_blank"
              rel="noopener"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(240, 237, 232, 0.5)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                '&:hover': { color: '#e8a838' },
              }}
            >
              GitHub
            </Box>
            <Box
              component="a"
              href="https://www.linkedin.com/in/david-j-riva"
              target="_blank"
              rel="noopener"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(240, 237, 232, 0.5)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                '&:hover': { color: '#e8a838' },
              }}
            >
              LinkedIn
            </Box>
            <Box
              component="a"
              href="mailto:davidjriva@gmail.com"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(240, 237, 232, 0.5)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                '&:hover': { color: '#e8a838' },
              }}
            >
              Email
            </Box>
          </Box>
        </Box>

        {/* Experience Card */}
        <Box
          className="about-animate"
          sx={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'rgba(240, 237, 232, 0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Experience
          </Typography>
          <Box>
            {sortedExperiences.map((exp) => (
              <ExperienceItem key={exp.title} {...exp} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
