'use client';

import { ReactNode } from 'react';
import '../styles/neon-glass-button.css';

interface NeonGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function NeonGlassButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}: NeonGlassButtonProps) {
  return (
    <button
      className={`neon-glass-button neon-glass-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="neon-glass-button__glow"></span>
      <span className="neon-glass-button__text">{children}</span>
    </button>
  );
}
