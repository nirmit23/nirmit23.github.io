import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ScrollFade.css';

/**
 * ScrollFade Component - Wraps content with fade-in animation on scroll
 * @param {Object} props
 * @param {ReactNode} props.children - Content to animate
 * @param {string} props.direction - Animation direction: 'up', 'down', 'left', 'right', 'fade'
 * @param {number} props.delay - Animation delay in milliseconds
 * @param {number} props.duration - Animation duration in seconds
 */
export default function ScrollFade({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={`scroll-fade scroll-fade-${direction} ${isVisible ? 'is-visible' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );
}