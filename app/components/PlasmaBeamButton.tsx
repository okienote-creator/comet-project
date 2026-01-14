'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

interface PlasmaBeamButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}

export function PlasmaBeamButton({
  href,
  children,
  variant = 'secondary',
  className = '',
  style,
}: PlasmaBeamButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      
      // Direct cursor position relative to button bounds (0-100%)
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Clamp to button bounds
      const cursorX = Math.max(0, Math.min(100, x));
      const cursorY = Math.max(0, Math.min(100, y));
      
      // Distance and angle from button center to cursor (for proximity/arc effects)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const distance = Math.hypot(dx, dy);
      
      // Proximity detection (max 300px)
      const proximity = Math.max(0, Math.min(1, 1 - distance / 300));
      
      // Magnetic pull attraction (separate from cursor alignment)
      const pullStrength = Math.max(0, 1 - distance / 180);
      const pullX = dx * pullStrength * 0.04;
      const pullY = dy * pullStrength * 0.04;
      
      // Set CSS variables — immediate, no easing
      button.style.setProperty('--cursor-x', `${cursorX}%`);
      button.style.setProperty('--cursor-y', `${cursorY}%`);
      button.style.setProperty('--beam-angle', `${angle}deg`);
      button.style.setProperty('--beam-distance', `${distance}px`);
      button.style.setProperty('--proximity', `${proximity}`);
      button.style.setProperty('--pull-intensity', `${proximity * proximity}`);
      button.style.setProperty('--pull-x', `${pullX}px`);
      button.style.setProperty('--pull-y', `${pullY}px`);
      
      // Arc visibility
      const arcVisibility = proximity > 0.2 && proximity < 0.9 ? 1 : 0;
      button.style.setProperty('--arc-opacity', `${arcVisibility}`);
    };

    const handleMouseLeave = () => {
      // Reset to center on leave
      button.style.setProperty('--cursor-x', '50%');
      button.style.setProperty('--cursor-y', '50%');
      button.style.setProperty('--proximity', '0');
      button.style.setProperty('--pull-intensity', '0');
      button.style.setProperty('--arc-opacity', '0');
      button.style.setProperty('--pull-x', '0px');
      button.style.setProperty('--pull-y', '0px');
    };

    const handleClick = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Trigger discharge animation
      button.style.setProperty('--discharge-active', '1');
      button.style.setProperty('--discharge-x', `${clickX}%`);
      button.style.setProperty('--discharge-y', `${clickY}%`);
      
      // Reset after 150ms
      setTimeout(() => {
        button.style.setProperty('--discharge-active', '0');
      }, 150);
    };

    // Attach listeners ONLY to this button
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="plasma-border-wrap">
      <Link
        ref={buttonRef}
        href={href}
        className={`plasma-beam-btn ${variant} ${className}`}
        style={style}
      >
        {children}
      </Link>
    </div>
  );
}

export default PlasmaBeamButton;
