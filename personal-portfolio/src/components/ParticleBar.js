'use client';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import options from '../particles-options/parallax.json';

const ParticleBar = () => {
  initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBar;
