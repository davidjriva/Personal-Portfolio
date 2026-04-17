'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import baseOptions from '../particles-options/parallax-bubble.json';

const ParticleBackground = ({ interactive = true, backgroundColor }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      ...baseOptions,
      background: {
        ...baseOptions.background,
        color: {
          ...baseOptions.background?.color,
          value: backgroundColor || '#0b0920',
        },
      },
      particles: {
        ...baseOptions.particles,
        color: {
          ...baseOptions.particles?.color,
          value: '#ffffff',
        },
        links: baseOptions.particles?.links
          ? {
              ...baseOptions.particles.links,
              color: { ...baseOptions.particles.links.color, value: '#ffffff' },
            }
          : baseOptions.particles?.links,
      },
      interactivity: interactive ? baseOptions.interactivity : undefined,
    }),
    [interactive, backgroundColor]
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
