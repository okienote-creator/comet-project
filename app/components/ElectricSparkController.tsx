'use client';

import { useEffect, useRef } from 'react';

interface Spark {
  id: string;
  element: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function ElectricSparkController() {
  const sparksRef = useRef<Map<string, Spark>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    console.log('⚡ Electric spark controller mounted');

    const container = containerRef.current;
    if (!container) return;

    const PROXIMITY_RADIUS = 120;
    const SPAWN_THROTTLE = 30; // ms between spark spawns

    const spawnSpark = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < SPAWN_THROTTLE) return;
      lastSpawnRef.current = now;

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const sparkId = `spark-${now}-${Math.random()}`;

      const spark = document.createElement('div');
      spark.className = 'electric-spark';
      spark.id = sparkId;

      const life = 100 + Math.random() * 200; // 100-300ms

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = '2px';
      spark.style.height = `${4 + Math.random() * 6}px`;
      spark.style.opacity = '1';
      spark.style.backgroundColor = ['#00b4ff', '#ffffff', '#7c00ff'][Math.floor(Math.random() * 3)];

      container.appendChild(spark);

      sparksRef.current.set(sparkId, {
        id: sparkId,
        element: spark,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: life,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll('.plasma-btn');

      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distX = e.clientX - btnCenterX;
        const distY = e.clientY - btnCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < PROXIMITY_RADIUS) {
          spawnSpark(e.clientX, e.clientY);
        }
      });
    };

    const animate = () => {
      const sparks = sparksRef.current;

      sparks.forEach((spark, id) => {
        spark.life += 16; // ~60fps

        const progress = spark.life / spark.maxLife;
        const opacity = Math.max(0, 1 - progress);

        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.1; // gravity

        spark.element.style.left = `${spark.x}px`;
        spark.element.style.top = `${spark.y}px`;
        spark.element.style.opacity = `${opacity}`;

        // Add jagged motion
        if (Math.random() > 0.7) {
          spark.vx += (Math.random() - 0.5) * 2;
          spark.vy += (Math.random() - 0.5) * 2;
        }

        if (spark.life >= spark.maxLife) {
          spark.element.remove();
          sparksRef.current.delete(id);
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      sparksRef.current.forEach((spark) => spark.element.remove());
      sparksRef.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    />
  );
}
