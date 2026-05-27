'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FadeIn from '@/components/sections/FadeIn';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    fetch('/data/experiences.json')
      .then((res) => res.json())
      .then(setExperiences)
      .catch(console.error);
  }, []);

  const toggle = (i) => setExpandedIndex(expandedIndex === i ? -1 : i);

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <FadeIn>
        <Typography variant="overline" sx={{ color: 'primary.main', mb: 1, display: 'block' }}>
          EXPERIENCE
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 6 }}>
          Where I&apos;ve worked
        </Typography>
      </FadeIn>

      <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 } }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 7, md: 15 },
            top: 8,
            bottom: 8,
            width: 2,
            bgcolor: 'rgba(255,255,255,0.06)',
            borderRadius: 1,
          }}
        />

        {experiences.map((exp, i) => {
          const isExpanded = expandedIndex === i;
          const isFirst = i === 0;

          return (
            <FadeIn key={i} delay={i * 0.1}>
              <Box
                sx={{
                  position: 'relative',
                  mb: i < experiences.length - 1 ? 4 : 0,
                  cursor: exp.bulletPoints ? 'pointer' : 'default',
                }}
                onClick={() => exp.bulletPoints && toggle(i)}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: -21, md: -29 },
                    top: 22,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: `2px solid ${isFirst ? '#818cf8' : 'rgba(255,255,255,0.15)'}`,
                    bgcolor: isFirst ? 'rgba(99,102,241,0.2)' : '#09090b',
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: isExpanded ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.06)',
                    bgcolor: isExpanded ? 'rgba(129,140,248,0.03)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(129,140,248,0.12)',
                      bgcolor: 'rgba(255,255,255,0.03)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                    {/* Company logo */}
                    <Box
                      component="img"
                      src={`/images/${exp.logoImage}`}
                      alt={exp.company}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        objectFit: 'contain',
                        bgcolor: 'rgba(255,255,255,0.06)',
                        p: 0.5,
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, mb: 0.3 }}>
                        {exp.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        <Box
                          component="a"
                          href={exp.companyWebsiteLink}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            color: 'primary.light',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {exp.company}
                        </Box>
                        {' · '}
                        {exp.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                      <Chip
                        label={`${exp.startDate} – ${exp.endDate}`}
                        size="small"
                        sx={{
                          height: 26,
                          fontSize: '0.72rem',
                          bgcolor: 'rgba(255,255,255,0.04)',
                          color: 'text.secondary',
                          border: '1px solid rgba(255,255,255,0.06)',
                          display: { xs: 'none', sm: 'flex' },
                        }}
                      />
                      {exp.bulletPoints && (
                        <ExpandMoreIcon
                          sx={{
                            color: 'text.secondary',
                            fontSize: 20,
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Mobile date */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      ml: 7,
                      display: { xs: 'block', sm: 'none' },
                      mb: 1,
                    }}
                  >
                    {exp.startDate} &ndash; {exp.endDate}
                  </Typography>

                  {/* Expandable bullet points */}
                  {exp.bulletPoints && (
                    <Collapse in={isExpanded} timeout={300}>
                      <Box component="ul" sx={{ mt: 2, ml: 7, pl: 2, mb: 0, listStyleType: 'none' }}>
                        {exp.bulletPoints.map((point, j) => (
                          <Box
                            component="li"
                            key={j}
                            sx={{
                              position: 'relative',
                              mb: 1.5,
                              pl: 2,
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 10,
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                opacity: 0.5,
                              },
                            }}
                          >
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                              {point}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              </Box>
            </FadeIn>
          );
        })}
      </Box>
    </Box>
  );
};

export default Experience;
