'use client';

import { Link as ScrollLink } from 'react-scroll';
import { Toolbar, Box, AppBar, IconButton, useTheme, alpha, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '@/contexts/ColorModeContext';
import './ScrollLink.css';

// Inline style for both active and inactive links
const linkStyles = {
  margin: '0 16px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'Montserrat, Arial, sans-serif',
  transition: 'all 0.3s ease', // smooth transition for on-hover and click-effects
};

const FormattedLink = ({ page, active, setActivePage }) => {
  const theme = useTheme();
  return (
    <ScrollLink
      to={page.toLowerCase()}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      onSetActive={() => setActivePage(page)}
      className="scroll-link"
      style={{
        ...linkStyles,
        color: active ? theme.palette.text.primary : theme.palette.text.secondary,
        fontWeight: active ? 'bold' : 'normal',
        borderBottom: active ? `2px solid ${theme.palette.text.primary}` : 'none',
        padding: '4px 8px',
      }}
    >
      {page}
    </ScrollLink>
  );
};

const Logo = () => {
  const container = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (hovered) {
      // Brackets expand outward to flank the new "output"
      gsap.to(".bracket-left", { x: -12, opacity: 0.5, duration: 0.4, ease: "power2.out" });
      gsap.to(".bracket-right", { x: 12, opacity: 0.5, duration: 0.4, ease: "power2.out" });
      
      // Slash disappears as it "transforms" into the stand
      gsap.to(".code-slash", { opacity: 0, scale: 0, duration: 0.3 });

      // Monitor Screen assembles
      gsap.fromTo(".monitor-screen", 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
      
      // Monitor Stand slides up
      gsap.fromTo(".monitor-stand-all",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    } else {
      // Restore to initial state
      gsap.to(".bracket-left", { x: 0, opacity: 1, duration: 0.4 });
      gsap.to(".bracket-right", { x: 0, opacity: 1, duration: 0.4 });
      gsap.to(".code-slash", { opacity: 1, scale: 1, duration: 0.4 });
      
      gsap.to(".monitor-screen", { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(".monitor-stand-all", { opacity: 0, y: 10, duration: 0.3 });
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
        width: 44,
        height: 44,
      }}
    >
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        
        {/* Monitor Screen Frame */}
        <rect
          className="monitor-screen"
          x="28"
          y="35"
          width="44"
          height="30"
          rx="3"
          stroke="#38c0f2"
          strokeWidth="4"
          opacity="0"
          style={{ transformOrigin: 'center' }}
        />
        
        {/* Monitor Stand Group */}
        <g className="monitor-stand-all" opacity="0">
          <path d="M50 65V78" stroke="white" strokeWidth="4" strokeLinecap="round" /> {/* Stem */}
          <path d="M40 78H60" stroke="white" strokeWidth="4" strokeLinecap="round" /> {/* Base */}
        </g>
      </svg>
    </Box>
  );
};

const pages = ['About', 'Projects', 'Contact'];

const NavBar = () => {
  const [activePage, setActivePage] = useState('About');
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: '#141413',
        backdropFilter: 'blur(10px)',
        height: '64px',
        color: 'white',
        transition: 'all 0.3s ease',
        borderBottom: '0.0625rem solid #30302e',
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.25rem'
            }}
          >
            DAVID<span style={{ color: '#38c0f2' }}>RIVA</span>
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            {pages.map((page) => (
              <FormattedLink key={page} page={page} active={activePage === page} setActivePage={setActivePage} />
            ))}
          </Box>

          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
