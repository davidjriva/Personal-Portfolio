'use client';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import options from '../particles-options/parallax-bubble.json';

const ParticleBackground = ({ interactive = true }) => {
  initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });

  if (!interactive) {
    delete options.interactivity; // Make the particle background non-interactive. This is used on the /chat page where interactivity is too distracting
  }

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
