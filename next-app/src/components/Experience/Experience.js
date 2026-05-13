'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';

const ExperienceCard = ({ title, company, companyWebsiteLink, logoImage, location, startDate, endDate, bulletPoints, isFirst }) => {
  const isCurrent = endDate === 'Present' || new Date(endDate) > new Date();
  const isGraduation = title.startsWith('Graduated');
  const displayTitle = isGraduation ? 'B.S. Computer Science, Summa Cum Laude' : title.split(',')[0];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, md: 3 },
        position: 'relative',
      }}
    >
      {/* Timeline line */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: 40,
          pt: 0.5,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: isCurrent ? '#6eb6f0' : 'rgba(255, 255, 255, 0.15)',
            flexShrink: 0,
            boxShadow: isCurrent ? '0 0 12px rgba(110, 182, 240, 0.3)' : 'none',
            mt: 1,
          }}
        />
        <Box
          sx={{
            flex: 1,
            width: '1px',
            bgcolor: 'rgba(255, 255, 255, 0.06)',
            mt: 1,
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          pb: 5,
          minWidth: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              overflow: 'hidden',
              bgcolor: '#fff',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
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
          <Box>
            <Typography
              component="a"
              href={companyWebsiteLink}
              target="_blank"
              sx={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#e8e6e3',
                textDecoration: 'none',
                '&:hover': { color: '#6eb6f0' },
                transition: 'color 0.2s ease',
              }}
            >
              {company}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              {location}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#e8e6e3',
            mb: 0.5,
          }}
        >
          {displayTitle}
        </Typography>

        <Typography
          sx={{
            fontSize: '0.75rem',
            color: isCurrent ? '#6eb6f0' : 'rgba(255, 255, 255, 0.3)',
            fontWeight: isCurrent ? 500 : 400,
            mb: bulletPoints ? 1.5 : 0,
          }}
        >
          {isGraduation ? startDate : `${startDate} — ${isCurrent ? 'Present' : endDate}`}
        </Typography>

        {bulletPoints && bulletPoints.length > 0 && (
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {bulletPoints.slice(0, 3).map((point, i) => (
              <Box
                component="li"
                key={i}
                sx={{
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  mb: 0.5,
                  '&::marker': { color: 'rgba(255,255,255,0.15)' },
                }}
              >
                {point}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Experience = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then((d) => {
        const sorted = [...d].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setData(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '750px',
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'rgba(255, 255, 255, 0.3)', mb: 4, display: 'block' }}
      >
        Experience
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
              <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.04)' }} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {data.map((exp, i) => (
            <ExperienceCard key={exp.title} {...exp} isFirst={i === 0} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Experience;
