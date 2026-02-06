'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import baseOptions from '../particles-options/parallax-bubble.json';

const ParticleBackground = ({ interactive = true, backgroundColor }) => {
  const theme = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    const updatedOptions = JSON.parse(JSON.stringify(baseOptions));
    
    // Update background color
    updatedOptions.background.color.value = backgroundColor || theme.palette.background.default;
    
    // Update particle colors
    const particleColor = theme.palette.mode === 'dark' ? '#ffffff' : '#000000';
    updatedOptions.particles.color.value = particleColor;
    
    if (updatedOptions.particles.links) {
      updatedOptions.particles.links.color.value = particleColor;
    }

    if (!interactive) {
      delete updatedOptions.interactivity;
    }
    
    return updatedOptions;
  }, [theme.palette.mode, theme.palette.background.default, interactive]);

  if (!init) {
    return null;
  }

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
