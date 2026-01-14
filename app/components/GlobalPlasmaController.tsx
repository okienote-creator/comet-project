'use client';

import { useEffect, useRef } from 'react';

interface PlasmaTarget {
  element: HTMLElement;
  rect: DOMRect;
}

interface Arc {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function GlobalPlasmaController() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const targetsRef = useRef<PlasmaTarget[]>([]);
  const chargeRef = useRef<Map<HTMLElement, number>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateTargets = () => {
      const plasmaElements = document.querySelectorAll('.plasma-beam-btn, .plasma-glow-btn');
      targetsRef.current = Array.from(plasmaElements).map((el) => ({
        element: el as HTMLElement,
        rect: (el as HTMLElement).getBoundingClientRect(),
      }));
    };

    const colorPalette = ['#00ff00', '#00ffff', '#0088ff', '#6600ff', '#ff00ff', '#ffffff'];
    const getColor = (intensity: number): string => {
      const idx = Math.floor((intensity * 10) % colorPalette.length);
      return colorPalette[idx];
    };

    const arcs: Arc[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      targetsRef.current.forEach((target) => {
        const rect = target.element.getBoundingClientRect();
        target.rect = rect;

        const dx = mouseRef.current.x - (rect.left + rect.width / 2);
        const dy = mouseRef.current.y - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Update charge for this target
        const currentCharge = chargeRef.current.get(target.element) || 0;
        let newCharge = currentCharge;
        if (dist < 200) {
          newCharge = Math.min(1, currentCharge + 0.03);
        } else {
          newCharge = Math.max(0, currentCharge - 0.02);
        }
        chargeRef.current.set(target.element, newCharge);

        // Spawn arcs near cursor if within range
        if (dist < 250 && newCharge > 0.1) {
          const spawnCount = Math.floor(newCharge * 3);
          for (let i = 0; i < spawnCount; i++) {
            if (Math.random() < 0.05) {
              const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
              arcs.push({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                vx: Math.cos(angle) * (3 + Math.random() * 4),
                vy: Math.sin(angle) * (3 + Math.random() * 4),
                life: 0,
                maxLife: 20 + Math.random() * 10,
                color: getColor(newCharge),
              });
            }
          }
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.life += 1;

        if (arc.life > arc.maxLife) {
          arcs.splice(i, 1);
          continue;
        }

        // Apply gravity
        arc.vy += 0.2;
        arc.x += arc.vx;
        arc.y += arc.vy;

        // Fade out
        const alpha = 1 - arc.life / arc.maxLife;

        // Draw bright core
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = arc.color;
        ctx.globalAlpha = alpha * 0.9;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 15;
        ctx.fill();

        // Draw glow
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha * 0.4;
        ctx.shadowBlur = 20;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial scan for plasma buttons
    updateTargets();

    // Re-scan periodically for dynamically added elements
    const scanInterval = setInterval(updateTargets, 2000);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(scanInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
