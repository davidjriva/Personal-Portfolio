'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import baseOptions from '../particles-options/parallax-bubble.json';

const ParticleBackground = ({ interactive = true, backgroundColor }) => {
  const theme = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    const particleColor = theme.palette.mode === 'dark' ? '#ffffff' : '#000000';
    
    return {
      ...baseOptions,
      background: {
        ...baseOptions.background,
        color: {
          ...baseOptions.background?.color,
          value: backgroundColor || theme.palette.background.default
        }
      },
      particles: {
        ...baseOptions.particles,
        color: {
          ...baseOptions.particles?.color,
          value: particleColor
        },
        links: baseOptions.particles?.links ? {
          ...baseOptions.particles.links,
          color: {
            ...baseOptions.particles.links.color,
            value: particleColor
          }
        } : baseOptions.particles?.links
      },
      interactivity: interactive ? baseOptions.interactivity : undefined
    };
  }, [theme.palette.mode, theme.palette.background.default, interactive, backgroundColor]);

  if (!init) {
    return null;
  }

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
