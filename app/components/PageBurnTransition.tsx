'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function PageBurnTransition() {
  const router = useRouter();
  const [isBurning, setIsBurning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate random embers on burn start
  const generateEmbers = () => {
    const newEmbers = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.3,
    }));
    setEmbers(newEmbers);
  };

  useEffect(() => {
    const handlePlasmaClick = (e: Event) => {
      if (isLocked) return;

      const button = e.target as HTMLElement;
      if (!button.closest('button.plasma-button[data-plasma="true"]')) return;

      setIsLocked(true);
      setIsBurning(true);
      generateEmbers();

      // Trigger screen shake
      document.body.classList.add('page-burn-shake');

      // Delay navigation to let animation play
      setTimeout(() => {
        document.body.classList.remove('page-burn-shake');
        const href = button.getAttribute('data-href') || '/';
        router.push(href);
      }, 1200);
    };

    const plasmaBtn = document.querySelector('button.plasma-button[data-plasma="true"]');
    if (plasmaBtn) {
      plasmaBtn.addEventListener('click', handlePlasmaClick as EventListener);
      return () => plasmaBtn.removeEventListener('click', handlePlasmaClick as EventListener);
    }
  }, [router, isLocked]);

  return (
    <>
      {isBurning && (
        <div className="page-burn-overlay page-burn-active">
          {/* Smoke layer */}
          <div className="burn-smoke"></div>

          {/* Electric fracture cracks */}
          <div className="burn-fractures">
            <svg className="fracture-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="fracture-path" d="M 50 0 L 45 25 L 52 50 L 48 75 L 50 100" />
              <path className="fracture-path" d="M 100 50 L 75 48 L 50 52 L 25 45 L 0 50" />
              <path className="fracture-path" d="M 70 20 L 60 40 L 75 60 L 65 80" />
              <path className="fracture-path" d="M 30 30 L 40 45 L 35 65 L 25 80" />
            </svg>
          </div>

          {/* Multi-layer burn planes */}
          <div className="burn-layer burn-layer-1"></div>
          <div className="burn-layer burn-layer-2"></div>
          <div className="burn-layer burn-layer-3"></div>
          <div className="burn-layer burn-layer-4"></div>

          {/* Heat distortion */}
          <div className="burn-distortion"></div>

          {/* Embers */}
          <div className="burn-embers">
            {embers.map((ember) => (
              <div
                key={ember.id}
                className="ember"
                style={{
                  '--ember-x': `${ember.x}%`,
                  '--ember-y': `${ember.y}%`,
                  '--ember-delay': `${ember.delay}s`,
                } as React.CSSProperties & { '--ember-x': string; '--ember-y': string; '--ember-delay': string }}
              />
            ))}
          </div>

          {/* Impact flash */}
          <div className="burn-flash"></div>
          <div className="burn-afterimage"></div>
        </div>
      )}
    </>
  );
}
