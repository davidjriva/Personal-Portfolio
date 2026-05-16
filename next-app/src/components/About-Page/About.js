'use client';

import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material';
import HeadShotImage from './HeadshotImage';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const cardSx = {
  bgcolor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '24px',
  p: 4,
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
};

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        px: { xs: 3, md: 6 },
        pt: { xs: '80px', md: '120px' },
        pb: { xs: '80px', md: '120px' },
      }}
    >
      {/* Section heading */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: '#f0ede6',
          mb: 6,
          letterSpacing: '-0.02em',
        }}
      >
        About
      </Typography>

      {/* Bento grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gridTemplateRows: { md: 'auto auto' },
          gap: 3,
        }}
      >
        {/* Card 1: Headshot + name (spans 2 rows on md) */}
        <Box
          sx={{
            ...cardSx,
            gridRow: { md: 'span 2' },
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
              width: 180,
              height: 180,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <HeadShotImage width={180} height={180} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#f0ede6', mb: 0.5 }}>
              David Riva
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(240, 237, 230, 0.6)' }}>
              Software Engineer
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(240, 237, 230, 0.4)', mt: 0.5 }}>
              Bay Area, CA
            </Typography>
          </Box>
        </Box>

        {/* Card 2: Bio */}
        <Box sx={{ ...cardSx, gridColumn: { md: 'span 2' } }}>
          <Typography variant="body1" sx={{ color: 'rgba(240, 237, 230, 0.8)', lineHeight: 1.8 }}>
            Software engineer passionate about AI and full-stack development. I build thoughtful, performant applications
            with a focus on elegant problem-solving and user experience. Experienced in data engineering, big data
            visualization, and distributed systems.
          </Typography>
        </Box>

        {/* Card 3: Quick stats */}
        <Box sx={{ ...cardSx }}>
          <Typography variant="body2" sx={{ color: 'rgba(240, 237, 230, 0.4)', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
            Quick Facts
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="body1" sx={{ color: '#f0ede6', fontWeight: 500 }}>
              2+ years experience
            </Typography>
            <Typography variant="body1" sx={{ color: '#f0ede6', fontWeight: 500 }}>
              B.S. CS, Summa Cum Laude
            </Typography>
            <Typography variant="body1" sx={{ color: '#f0ede6', fontWeight: 500 }}>
              Colorado State University
            </Typography>
          </Box>
        </Box>

        {/* Card 4: Social links */}
        <Box sx={{ ...cardSx, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'rgba(240, 237, 230, 0.4)', mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
            Connect
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink href="https://github.com/davidjriva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="GitHub Profile"
                sx={{
                  color: 'rgba(240, 237, 230, 0.6)',
                  fontSize: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  p: 1.5,
                  '&:hover': { color: '#f0ede6', borderColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <GitHubIcon fontSize="inherit" />
              </IconButton>
            </MuiLink>
            <MuiLink href="https://www.linkedin.com/in/david-j-riva" target="_blank" rel="noopener" color="inherit">
              <IconButton
                aria-label="LinkedIn Profile"
                sx={{
                  color: 'rgba(240, 237, 230, 0.6)',
                  fontSize: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  p: 1.5,
                  '&:hover': { color: '#f0ede6', borderColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <LinkedInIcon fontSize="inherit" />
              </IconButton>
            </MuiLink>
          </Box>
        </Box>

        {/* Card 5: Resume link - spans full width on mobile */}
        <Box
          component="a"
          href="/documents/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            ...cardSx,
            gridColumn: { md: 'span 3' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'rgba(245, 158, 11, 0.3)',
              '& .arrow-icon': {
                transform: 'translateX(4px) translateY(-4px)',
              },
            },
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(240, 237, 230, 0.4)', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
              Resume
            </Typography>
            <Typography variant="body1" sx={{ color: '#f0ede6', fontWeight: 500 }}>
              View my full resume
            </Typography>
          </Box>
          <ArrowOutwardIcon
            className="arrow-icon"
            sx={{ color: 'rgba(240, 237, 230, 0.4)', transition: 'transform 0.2s ease' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
