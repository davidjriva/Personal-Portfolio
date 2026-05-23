'use client';

import { Box, Typography, IconButton } from '@mui/material';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';

gsap.registerPlugin(ScrollTrigger);

function BentoCard({ children, sx = {}, className = 'bento-card' }) {
  return (
    <Box
      className={className}
      sx={{
        bgcolor: '#18181b',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        p: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          transform: 'translateY(-2px)',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.bento-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }
  }, []);

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
        About
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
        Get to know me
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        <BentoCard
          sx={{
            gridColumn: { md: 'span 2' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: 130, md: 170 },
              height: { xs: 130, md: 170 },
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(56, 189, 248, 0.15)',
            }}
          >
            <Image
              src="/images/headshot.webp"
              alt="David Riva"
              width={170}
              height={170}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </Box>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" sx={{ mb: 1.5, fontSize: { xs: '1.4rem', md: '1.7rem' } }}>
              David Riva
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Software engineer with a passion for building AI-powered applications and scalable systems. Currently
              working as a Training Engineer in Generative AI at C3 AI, where I develop production RAG pipelines and
              agentic solutions.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Colorado State University graduate, Summa Cum Laude, with expertise spanning full-stack development,
              machine learning, and big data engineering.
            </Typography>
          </Box>
        </BentoCard>

        <BentoCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                San Francisco Bay Area
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#4ade80',
                  boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)',
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Open to opportunities
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/davidjriva"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary', '&:hover': { color: '#fafafa' } }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/david-riva/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary', '&:hover': { color: '#0a66c2' } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:davidjriva@gmail.com"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </BentoCard>

        <BentoCard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            '&:hover .resume-icon': {
              transform: 'translateY(-4px)',
              color: 'primary.main',
            },
          }}
        >
          <Box
            component="a"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
          >
            <DescriptionIcon
              className="resume-icon"
              sx={{ fontSize: 40, color: 'text.secondary', mb: 1.5, transition: 'all 0.3s ease' }}
            />
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Resume
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              View my full resume
            </Typography>
          </Box>
        </BentoCard>

        <BentoCard sx={{ gridColumn: { md: 'span 2' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              textAlign: 'center',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '10+', label: 'Projects Built' },
              { value: '4', label: 'Awards Earned' },
              { value: '3.94', label: 'GPA' },
            ].map((stat) => (
              <Box key={stat.label} sx={{ flex: '1 1 auto', minWidth: 90 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #38bdf8, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </BentoCard>
      </Box>
    </Box>
  );
}
