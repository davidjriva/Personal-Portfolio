'use client';

import { Box, Typography, IconButton, Link, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';

const card = {
  bgcolor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  transition: 'border-color 0.3s ease, background 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255,255,255,0.1)',
    bgcolor: 'rgba(255,255,255,0.03)',
  },
};

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 5 },
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <SectionHeading label="About" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gridTemplateRows: 'auto',
          gap: 2.5,
        }}
      >
        {/* Bio card — spans 2 cols */}
        <Box sx={{ ...card, gridColumn: { xs: '1', md: '1 / 3' } }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '16px',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid rgba(167,139,250,0.2)',
              }}
            >
              <Image
                alt="David Riva"
                src="/images/headshot.webp"
                width={90}
                height={90}
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', mb: 0.5 }}>
                David Riva
              </Typography>
              <Typography sx={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 500, mb: 0.25 }}>
                Software Engineer
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>Bay Area, CA</Typography>
            </Box>
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.55)', mt: 3, lineHeight: 1.7, fontSize: '0.95rem' }}>
            I&apos;m a software engineer with a passion for applied AI and full-stack development. I graduated from
            Colorado State University with a B.S. in Computer Science, Summa Cum Laude. I build production systems that
            combine modern web technologies with AI — from RAG pipelines to agentic workflows.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.55)', mt: 2, lineHeight: 1.7, fontSize: '0.95rem' }}>
            I have a strong background in data structures, algorithms, and mathematical applications. I pride myself on
            elegant problem-solving and a dedication to high standards of engineering excellence.
          </Typography>
        </Box>

        {/* Links card */}
        <Box sx={{ ...card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2.5 }}>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/davidjriva' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-j-riva' },
                { icon: <EmailIcon />, label: 'Email', href: 'mailto:davidjriva@gmail.com' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: 'rgba(255,255,255,0.5)',
                    py: 1,
                    px: 1.5,
                    borderRadius: '10px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#e8e6e3',
                      bgcolor: 'rgba(255,255,255,0.04)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '1.2rem', display: 'flex' }}>{link.icon}</Box>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{link.label}</Typography>
                </Link>
              ))}
            </Box>
          </Box>

          <Button
            variant="outlined"
            onClick={() => window.open('/documents/resume.pdf', '_blank')}
            endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              mt: 3,
              color: '#a78bfa',
              borderColor: 'rgba(167,139,250,0.25)',
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              py: 1,
              '&:hover': {
                borderColor: 'rgba(167,139,250,0.5)',
                bgcolor: 'rgba(167,139,250,0.06)',
              },
            }}
          >
            View Resume
          </Button>
        </Box>

        {/* Awards card — spans 1 col */}
        <Box sx={{ ...card }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
            Recognition
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { title: '1st Place, C3 AI Hackathon', sub: 'Agentic AI tools — 400+ participants', date: '2025' },
              { title: 'Summa Cum Laude', sub: 'Colorado State University — 4.0 GPA', date: '2024' },
              { title: 'Excellence in Data Science', sub: 'CSU Undergraduate Research', date: '2023' },
            ].map((award) => (
              <Box key={award.title}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#e8e6e3', lineHeight: 1.3 }}>
                    {award.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', flexShrink: 0, ml: 1 }}>
                    {award.date}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', mt: 0.25 }}>
                  {award.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Skills card — spans 2 cols */}
        <Box sx={{ ...card, gridColumn: { xs: '1', md: '2 / 4' } }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2.5 }}>
            Technical Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
              { label: 'Python', accent: true },
              { label: 'TypeScript', accent: true },
              { label: 'Java', accent: true },
              { label: 'React' },
              { label: 'Next.js' },
              { label: 'Node.js' },
              { label: 'LangChain' },
              { label: 'LangGraph' },
              { label: 'RAG Pipelines' },
              { label: 'Pinecone' },
              { label: 'OpenAI API' },
              { label: 'TensorFlow' },
              { label: 'FastAPI' },
              { label: 'Docker' },
              { label: 'PostgreSQL' },
              { label: 'MongoDB' },
              { label: 'AWS' },
              { label: 'Git' },
              { label: 'Claude Code' },
              { label: 'Apache Spark' },
            ].map((skill) => (
              <Box
                key={skill.label}
                sx={{
                  px: 1.5,
                  py: 0.6,
                  borderRadius: '8px',
                  bgcolor: skill.accent ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.04)',
                  border: skill.accent ? '1px solid rgba(167,139,250,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  color: skill.accent ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: skill.accent ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.15)',
                    bgcolor: skill.accent ? 'rgba(167,139,250,0.12)' : 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                {skill.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
