'use client';

import { Box, Typography, Button, IconButton, Link } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SectionHeading from '@/components/SectionHeading';

const cardSx = {
  background: 'rgba(255, 255, 255, 0.025)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease, background 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.12)',
    background: 'rgba(255, 255, 255, 0.035)',
  },
};

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading sectionName="About" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gridTemplateRows: { xs: 'auto', md: 'auto auto' },
          gap: 2.5,
        }}
      >
        {/* Photo + Name card */}
        <Box
          sx={{
            ...cardSx,
            gridColumn: { xs: '1', md: '1' },
            gridRow: { xs: 'auto', md: '1 / 3' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: 160,
              height: 160,
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.08)',
              flexShrink: 0,
            }}
          >
            <Image
              alt="Photo of David Riva"
              src="/images/headshot.webp"
              width={160}
              height={160}
              style={{ objectFit: 'cover' }}
              priority={true}
            />
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 0.5 }}
            >
              David Riva
            </Typography>
            <Typography sx={{ color: '#818cf8', fontSize: '0.9rem', fontWeight: 500, mb: 1 }}>
              Training Engineer, Generative AI
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
              Bay Area, CA
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener">
              <IconButton
                aria-label="GitHub Profile"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  width: 40,
                  height: 40,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener">
              <IconButton
                aria-label="LinkedIn Profile"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  width: 40,
                  height: 40,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Link>
            <Link href="mailto:davidjriva@gmail.com">
              <IconButton
                aria-label="Email"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  width: 40,
                  height: 40,
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#fafafa', borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)' },
                }}
              >
                <EmailOutlinedIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Link>
          </Box>

          <Button
            variant="outlined"
            onClick={() => window.open('/documents/resume.pdf', '_blank')}
            endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              color: 'rgba(255,255,255,0.6)',
              borderColor: 'rgba(255,255,255,0.12)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.82rem',
              fontWeight: 500,
              px: 2.5,
              py: 0.8,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fafafa',
                background: 'rgba(255,255,255,0.04)',
              },
            }}
          >
            View Resume
          </Button>
        </Box>

        {/* Bio card */}
        <Box sx={{ ...cardSx, gridColumn: { xs: '1', md: '2 / 4' } }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', mb: 2, display: 'block' }}>
            BIOGRAPHY
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado State
            University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions. I&apos;m
            incredibly passionate about software &amp; applied AI engineering.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            I&apos;m experienced in full-stack development, data engineering, and big data visualization.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
            elegant problem-solving and my dedication to maintaining high standards of excellence.
          </Typography>
        </Box>

        {/* Awards card */}
        <Box sx={{ ...cardSx, gridColumn: { xs: '1', md: '2 / 4' } }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', mb: 2.5, display: 'block' }}>
            RECOGNITION
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { title: '1st Place — C3 Agentic AI Hackathon', meta: 'May 2025 · 400+ participants' },
              { title: 'Summa Cum Laude', meta: 'May 2024 · 4.0 GPA' },
              { title: 'Excellence in Data Science Award', meta: 'April 2023 · CSU Research Competition' },
              { title: "Dean's List", meta: 'Fall 2021 – Spring 2024 · All semesters' },
            ].map((award) => (
              <Box
                key={award.title}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#818cf8',
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#fafafa', lineHeight: 1.4 }}>
                    {award.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>{award.meta}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
