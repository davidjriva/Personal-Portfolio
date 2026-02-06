'use client';

import { Box } from '@mui/material';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Logo = () => {
  const container = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (hovered) {
      // Brackets expand outward and disappear
      gsap.to(".bracket-left", { x: -20, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(".bracket-right", { x: 20, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      
      // Slash disappears as it "transforms" into the stand
      gsap.to(".code-slash", { opacity: 0, scale: 0, duration: 0.3 });

      // Monitor Screen assembles
      gsap.fromTo(".monitor-screen", 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );

      // Code appearance on screen
      gsap.to(".monitor-code", { opacity: 1, duration: 0.3, delay: 0.4 });
      gsap.fromTo(".code-line", 
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.1, duration: 0.4, delay: 0.4, transformOrigin: "left center", ease: "power1.out" }
      );
      
      // Monitor Stand slides up
      gsap.fromTo(".monitor-stand-all",
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    } else {
      // Restore to initial state
      gsap.to(".bracket-left", { x: 0, opacity: 1, duration: 0.4 });
      gsap.to(".bracket-right", { x: 0, opacity: 1, duration: 0.4 });
      gsap.to(".code-slash", { opacity: 1, scale: 1, duration: 0.4 });
      
      gsap.to(".monitor-screen", { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(".monitor-code", { opacity: 0, duration: 0.2 });
      gsap.to(".monitor-stand-all", { opacity: 0, y: 5, duration: 0.3 });
    }
  }, { scope: container, dependencies: [hovered] });

  return (
    <Box
      ref={container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2,
        cursor: 'pointer',
        width: 40,
        height: 40,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Bracket */}
        <path
          className="bracket-left"
          d="M32 38L22 50L32 62"
          stroke="#38c0f2"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Bracket */}
        <path
          className="bracket-right"
          d="M68 38L78 50L68 62"
          stroke="#38c0f2"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* The Slash */}
        <path
          className="code-slash"
          d="M56 35L44 65"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />
        
        {/* Monitor Screen Frame - Higher and More Compact */}
        <rect
          className="monitor-screen"
          x="30"
          y="32"
          width="40"
          height="26"
          rx="2"
          stroke="#38c0f2"
          strokeWidth="4"
          opacity="0"
          style={{ transformOrigin: 'center' }}
        />

        {/* Code Content on Screen - Adjusted for new rectangle position */}
        <g className="monitor-code" opacity="0">
          <path className="code-line" d="M35 38H50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path className="code-line" d="M35 45H60" stroke="#38c0f2" strokeWidth="2.5" strokeLinecap="round" />
          <path className="code-line" d="M35 52H42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        
        {/* Monitor Stand Group - More Compact Stand */}
        <g className="monitor-stand-all" opacity="0">
          <path d="M50 58V68" stroke="white" strokeWidth="4" strokeLinecap="round" /> {/* Shortened Stem */}
          <path d="M42 68H58" stroke="white" strokeWidth="4" strokeLinecap="round" /> {/* Sized Base */}
        </g>
      </svg>
    </Box>
  );
};

export default Logo;
