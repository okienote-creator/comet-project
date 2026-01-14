'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ElectricSparkCanvas from './ElectricSparkCanvas';

interface HeroCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}

export function HeroCTA({
  href,
  children,
  variant = 'secondary',
  className = '',
  style,
}: HeroCTAProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={buttonRef}>
        <Link
          href={href}
          className={`cta-button ${variant} plasma-beam-btn ${className}`}
          style={style}
        >
          {children}
        </Link>
      </div>
      <ElectricSparkCanvas />
    </>
  );
}

export default HeroCTA;
