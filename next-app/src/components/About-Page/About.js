'use client';

import { Box, Typography, IconButton, Link, Button, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';

const cardSx = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '20px',
  p: { xs: 3, md: 4 },
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: 'rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.035)',
  },
};

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 10, md: 15 },
      }}
    >
      <SectionHeading sectionName="About" subtitle="Get to know me" />

      <Grid container spacing={2.5}>
        {/* Photo card */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Box
            sx={{
              ...cardSx,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2.5,
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.08)',
                flexShrink: 0,
              }}
            >
              <Image
                alt="Photo of David Riva"
                src="/images/headshot.webp"
                width={160}
                height={160}
                style={{ objectFit: 'cover', display: 'block' }}
                priority
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.25 }}>David Riva</Typography>
              <Typography sx={{ color: '#38c0f2', fontSize: '0.82rem', fontWeight: 500 }}>
                Software Engineer
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Bio card */}
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Box sx={{ ...cardSx, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
              Hi, I&apos;m David. I&apos;m a software engineer based in the Bay Area, CA, and a graduate of Colorado
              State University, where I received a B.S. in Computer Science with Summa Cum Laude distinctions.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
              I&apos;m passionate about applied AI engineering and full-stack development. I have experience building
              production RAG systems, agentic pipelines, and scalable web applications.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              I bring a strong foundation in data structures, algorithms, and mathematical applications — and I pride
              myself on elegant problem-solving and high standards of excellence.
            </Typography>
          </Box>
        </Grid>

        {/* Quick info cards column */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
            {/* Location */}
            <Box sx={{ ...cardSx, display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <LocationOnOutlinedIcon sx={{ color: '#38c0f2', fontSize: '1.3rem' }} />
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500, mb: 0.25 }}>
                  Location
                </Typography>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>Bay Area, CA</Typography>
              </Box>
            </Box>

            {/* Email */}
            <Box
              component="a"
              href="mailto:davidjriva@gmail.com"
              sx={{
                ...cardSx,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flex: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <EmailOutlinedIcon sx={{ color: '#38c0f2', fontSize: '1.3rem' }} />
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500, mb: 0.25 }}>
                  Email
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>davidjriva@gmail.com</Typography>
              </Box>
            </Box>

            {/* Resume */}
            <Box
              component="a"
              href="/documents/resume.pdf"
              target="_blank"
              sx={{
                ...cardSx,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flex: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <DescriptionOutlinedIcon sx={{ color: '#38c0f2', fontSize: '1.3rem' }} />
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500, mb: 0.25 }}>
                  Resume
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>View PDF →</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Social links card */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              ...cardSx,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              py: 2.5,
            }}
          >
            <Link href="https://github.com/davidjriva" target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#f0f0f5' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.4rem' }} />
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>GitHub</Typography>
              </Box>
            </Link>
            <Box sx={{ width: 1, height: 20, bgcolor: 'rgba(255,255,255,0.08)' }} />
            <Link
              href="https://www.linkedin.com/in/david-j-riva"
              target="_blank"
              rel="noopener"
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#38c0f2' },
                }}
              >
                <LinkedInIcon sx={{ fontSize: '1.4rem' }} />
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>LinkedIn</Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
