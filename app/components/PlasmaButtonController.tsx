'use client';

import { useEffect } from 'react';

export function PlasmaButtonController() {
  useEffect(() => {
    console.log('⚡ Plasma controller mounted');
    const buttons = document.querySelectorAll('.plasma-beam-btn, .plasma-glow-btn');
    
    console.log(`✅ DEBUG: Found ${buttons.length} plasma effect elements`);
    
    buttons.forEach((btn, idx) => {
      console.log(`✅ DEBUG: Button ${idx} class="${btn.className}"`);
      
      // Debug: Log when mouse enters button
      btn.addEventListener('mouseenter', () => {
        console.log(`🎯 DEBUG: Mouse ENTERED button ${idx} - CSS should flash cyan`);
      });
      
      btn.addEventListener('mouseleave', () => {
        console.log(`🎯 DEBUG: Mouse LEFT button ${idx}`);
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        (btn as HTMLElement).style.setProperty('--cx', `${x}%`);
        (btn as HTMLElement).style.setProperty('--cy', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}
