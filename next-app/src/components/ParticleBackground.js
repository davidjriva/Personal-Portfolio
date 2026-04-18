'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import baseOptions from '../particles-options/parallax-bubble.json';

// Start engine initialization immediately on module load, not on component mount
const engineReady = initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});

const ParticleBackground = ({ interactive = true, backgroundColor }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    engineReady.then(() => setInit(true));
  }, []);

  const isTransparent = backgroundColor === 'transparent';

  const options = useMemo(
    () => ({
      ...baseOptions,
      background: {
        ...baseOptions.background,
        color: {
          ...baseOptions.background?.color,
          value: isTransparent ? '#000000' : (backgroundColor || '#0b0920'),
        },
        opacity: isTransparent ? 0 : (baseOptions.background?.opacity ?? 1),
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
    [interactive, backgroundColor, isTransparent]
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
