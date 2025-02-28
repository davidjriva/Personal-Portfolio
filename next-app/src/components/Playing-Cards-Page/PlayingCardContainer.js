'use client';

import { useEffect, useRef } from 'react';

import ReactLenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import projectData from '../../data/projects.json';
import Card from './Card';
import './playing-cards.css';

gsap.registerPlugin(ScrollTrigger);

const PlayingCards = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  // Card spread and rotate animation that plays on-scroll
  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;

      // Define x and y positions for each card
      const positions = [
        { x: 14, y: 0 },
        { x: 38, y: 0 },
        { x: 62, y: 0 },
        { x: 86, y: 0 },
        { x: 14, y: 60 },
        { x: 38, y: 60 },
        { x: 62, y: 60 },
        { x: 86, y: 60 },
      ];

      // Define rotation for each card
      const rotations = [-15, -7.5, 7.5, 15, -15, -7.5, 7.5, 15];

      // Pin the cards section
      ScrollTrigger.create({
        trigger: container.current.querySelector('.cards'),
        start: 'top 40%', // Adjusted to make the animation start lower
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Spread cards with correct positions and rotations
      cards.forEach((card, index) => {
        const position = positions[index]; // Get the x and y position

        gsap.to(card, {
          left: `${position.x}%`,
          top: `${position.y}%`,
          rotation: `${rotations[index]}deg`, // Apply rotation in degrees
          ease: 'none',
          scrollTrigger: {
            trigger: container.current.querySelector('.cards'),
            start: 'top 50%', // Same start as before
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // Flip cards and reset rotations with stagger
      cards.forEach((card, index) => {
        const frontEl = card.querySelector('.flip-card-front');
        const backEl = card.querySelector('.flip-card-back');

        const staggerOffset = index * 0.05;

        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: container.current.querySelector('.cards'),
          start: 'top 50%', // Adjusted for staggered flip effect
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: 'power1.out' });
              gsap.to(backEl, { rotateY: backRotation, ease: 'power1.out' });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: 'power1.out',
              });
            }
          },
        });
      });
    },
    { scope: container }
  );

  // Cleanup function on component unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  /* 
    Sorts all projects chronologically by start date.

    Only the eight most recent projects are displayed
  */
  const sortedProjectData = [...projectData]
    .sort((a, b) => {
      return new Date(b.dateStarted) - new Date(a.dateStarted);
    })
    .slice(0, 8);

  return (
    <>
      <ReactLenis root>
        <div className="container" ref={container}>
          <section className="cards">
            {[...Array(8)].map((_, index) => (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc="/images/playing-card-cover.png"
                frontAlt="Card Image"
                projectData={sortedProjectData[index]}
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </section>
        </div>
      </ReactLenis>
    </>
  );
};

export default PlayingCards;
