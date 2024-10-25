'use client';

import React from 'react';
import './ViewWorkButton.css';

const ViewWorkButton = () => {
  const scrollToSection = () => {
    const section = document.getElementById('about');
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;

    const offset = 70;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToSection} className="hvr-ripple-out">
      View my work
    </button>
  );
};

export default ViewWorkButton;
