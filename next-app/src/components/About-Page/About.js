'use client';

import { Box, Typography, IconButton, Link, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GLASS = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '20px',
};

const BentoCell = ({ children, sx = {}, className }) => (
  <Box className={className} sx={{ ...GLASS, p: { xs: 3, md: 4 }, ...sx }}>
    {children}
  </Box>
);

const About = () => {
  const [awards, setAwards] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/data/awards.json')
      .then((r) => r.json())
      .then(setAwards);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cells = gridRef.current.querySelectorAll('.bento-cell');
    gsap.fromTo(
      cells,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [awards]);

  return (
    <Box>
      <Box sx={{ mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="overline"
          sx={{ color: '#00d4ff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', mb: 1.5, display: 'block' }}
        >
          About
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: '#e8e8ed',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          A bit about me
        </Typography>
      </Box>

      <Box
        ref={gridRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gridTemplateRows: 'auto',
          gap: 2.5,
        }}
      >
        {/* Bio Card — spans full width on mobile, left column on desktop */}
        <BentoCell className="bento-cell" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '14px',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid rgba(0,212,255,0.15)',
                display: { xs: 'block', sm: 'block' },
              }}
            >
              <Image
                alt="David Riva"
                src="/images/headshot.webp"
                width={56}
                height={56}
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: '#e8e8ed', lineHeight: 1.2 }}>
                David Riva
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#00d4ff', fontWeight: 500 }}>
                Software Engineer
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
            Software engineer based in the Bay Area, CA. I graduated from Colorado State University with a B.S. in
            Computer Science, Summa Cum Laude. I&apos;m passionate about applied AI engineering, full-stack development,
            and building tools that solve real problems.
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
            I have deep experience in data engineering, big data visualization, and production AI systems — from RAG
            pipelines to agentic workflows. I bring a strong foundation in algorithms, system design, and intuitive UI
            development.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DescriptionOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
              onClick={() => window.open('/documents/resume.pdf', '_blank')}
              sx={{
                color: '#00d4ff',
                borderColor: 'rgba(0,212,255,0.25)',
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                px: 2,
                '&:hover': { borderColor: '#00d4ff', bgcolor: 'rgba(0,212,255,0.08)' },
              }}
            >
              Resume
            </Button>
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
              <IconButton
                aria-label="GitHub"
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  width: 36,
                  height: 36,
                  '&:hover': { color: '#e8e8ed', borderColor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
              <IconButton
                aria-label="LinkedIn"
                size="small"
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  width: 36,
                  height: 36,
                  '&:hover': { color: '#0a66c2', borderColor: 'rgba(10,102,194,0.3)' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Link>
          </Box>
        </BentoCell>

        {/* Headshot Card — right column on desktop, hidden on mobile (shown inline in bio) */}
        <BentoCell
          className="bento-cell"
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            overflow: 'hidden',
            minHeight: 300,
          }}
        >
          <Image
            alt="David Riva"
            src="/images/headshot.webp"
            width={400}
            height={400}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </BentoCell>

        {/* Stats Card */}
        <BentoCell className="bento-cell">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 3 }}>
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '11', label: 'Projects Built' },
              { value: '4.0', label: 'GPA' },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#e8e8ed',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', mt: 0.5, fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </BentoCell>

        {/* Awards Card */}
        <BentoCell className="bento-cell">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <EmojiEventsOutlinedIcon sx={{ color: '#f59e0b', fontSize: '1.2rem' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#e8e8ed' }}>Awards</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {awards.map((award) => (
              <Box key={award.title} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                  {award.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.25)',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {award.date}
                </Typography>
              </Box>
            ))}
          </Box>
        </BentoCell>
      </Box>
    </Box>
  );
};

export default About;
